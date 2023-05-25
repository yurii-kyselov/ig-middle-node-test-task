import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { defaultRequestSchemaOptions } from '~/common/validation/common.schema';
import { signInUserValidationSchema } from '~/common/validation/user.schema';

@JoiSchemaOptions(defaultRequestSchemaOptions)
export class SignInUserDto {
  @JoiSchema(signInUserValidationSchema.email)
  email: string;

  @JoiSchema(signInUserValidationSchema.password)
  password: string;
}
