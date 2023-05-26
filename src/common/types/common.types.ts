import Joi from 'joi';
import { Request } from 'express';
import { UserDataDto } from '../../modules/user/dto/user-data.dto';

export type ValidationSchemaType<T> = { [key in keyof T]: Joi.AnySchema };

export type UserSessionType = { userData: UserDataDto };

export type RequestSessionType = Request & { session: UserSessionType };

export interface IObject {
  [key: string]: any;
}
