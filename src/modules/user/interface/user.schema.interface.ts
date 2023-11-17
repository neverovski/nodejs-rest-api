import { JsonSchemaRequest } from '@common/types';

export interface IUserSchema {
  changePassword(): JsonSchemaRequest;
  create(): JsonSchemaRequest;
  update(): JsonSchemaRequest;
}
