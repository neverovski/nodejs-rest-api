import { JsonSchemaOptions } from '@common/types';

export interface IUserSchema {
  changePassword(): JsonSchemaOptions;
  create(): JsonSchemaOptions;
  update(): JsonSchemaOptions;
}
