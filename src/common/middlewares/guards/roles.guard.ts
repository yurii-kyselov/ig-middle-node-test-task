import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../../enums/roles.enum';
import { RequestSessionType } from '../../types/common.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const endpointRoles = this.reflector.get<RolesEnum[]>('roles', context.getHandler()) || [];

    if (!endpointRoles.length) return true;

    const request: RequestSessionType = context.switchToHttp().getRequest();
    const {
      userData: { role },
    } = request.session;

    return endpointRoles.includes(role);
  }
}
