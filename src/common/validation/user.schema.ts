import { SignInUserDto } from '~/modules/user/dto/sign-in-user.dto';
import {
  emailValidation,
  passwordValidation,
} from '~/common/validation/common.schema';
import { ValidationSchemaType } from '~/common/types/common.types';

export const signInUserValidationSchema: ValidationSchemaType<SignInUserDto> = {
  email: emailValidation,
  password: passwordValidation,
};
