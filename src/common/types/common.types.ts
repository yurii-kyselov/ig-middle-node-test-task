import Joi from 'joi';

export type ValidationSchemaType<T> = { [key in keyof T]: Joi.AnySchema };
