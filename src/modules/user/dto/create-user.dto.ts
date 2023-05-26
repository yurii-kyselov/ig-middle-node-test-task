import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { defaultRequestSchemaOptions } from '../../../common/validation/common.schema';
import { createUserValidationSchema } from '../../../common/validation/user.schema';

@JoiSchemaOptions(defaultRequestSchemaOptions)
export class CreateUserDto {
  @JoiSchema(createUserValidationSchema.email)
  email: string;

  @JoiSchema(createUserValidationSchema.password)
  password: string;
}
