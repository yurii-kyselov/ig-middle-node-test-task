import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestSessionType } from '../../types/common.types';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: RequestSessionType = context.switchToHttp().getRequest();

    if (!request.session.userData) throw new UnauthorizedException('Unauthorized!');

    return true;
  }
}
