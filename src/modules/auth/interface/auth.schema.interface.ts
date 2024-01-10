import { JsonSchemaOptions } from '@common/types';

export interface IAuthSchema {
  forgotPasswordByEmail(): JsonSchemaOptions;
  login(): JsonSchemaOptions;
  platform(): JsonSchemaOptions;
  refreshToken(): JsonSchemaOptions;
  resetPasswordByEmail(): JsonSchemaOptions;
  verifyEmailByCode(): JsonSchemaOptions;
}
