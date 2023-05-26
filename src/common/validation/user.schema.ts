import Joi from 'joi';
import { ValidationSchemaType } from '../types/common.types';
import { LoginUserDto } from '../../modules/user/dto/login-user.dto';
import { emailValidation, passwordValidation } from './common.schema';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';

export const signInUserValidationSchema: ValidationSchemaType<LoginUserDto> = {
  email: emailValidation.required(),
  password: Joi.string().required(),
};

export const createUserValidationSchema: ValidationSchemaType<CreateUserDto> = {
  email: emailValidation.required(),
  password: passwordValidation.required(),
};
