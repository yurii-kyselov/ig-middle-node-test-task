import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums/roles.enum';

export const RolesDecorator = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
