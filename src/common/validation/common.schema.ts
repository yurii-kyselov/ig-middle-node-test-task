import Joi, { ValidationOptions } from 'joi';
import { passwordRegEx } from '~/common/validation/regex/common.regex';

export const defaultRequestSchemaOptions: ValidationOptions = {
  abortEarly: true,
  allowUnknown: false,
  convert: true,
};

export const emailSchemaOptions: Joi.EmailOptions = { tlds: { allow: false } };

const stringValidation = Joi.string();

export const emailValidation = stringValidation.email(emailSchemaOptions);
export const passwordValidation = stringValidation.pattern(passwordRegEx);
