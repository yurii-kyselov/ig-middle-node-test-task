import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { defaultRequestSchemaOptions } from '../../../common/validation/common.schema';
import { updateUserValidationSchema } from '../../../common/validation/user.schema';

@JoiSchemaOptions(defaultRequestSchemaOptions)
export class UpdateUserDto {
  @JoiSchema(updateUserValidationSchema.newBossEmail)
  newBossEmail: string;

  @JoiSchema(updateUserValidationSchema.subordinatesEmails)
  subordinatesEmails: string[];
}
