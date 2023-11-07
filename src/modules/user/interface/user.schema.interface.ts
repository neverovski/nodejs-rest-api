import { JsonSchema } from '@common/types';

export interface IUserSchema {
  changePassword(): JsonSchema;
  create(): JsonSchema;
  update(): JsonSchema;
}
