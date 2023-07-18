import { JsonSchemaProp, SchemaOption } from '@common/types';

export interface ISchema {
  getBoolean(key: string): JsonSchemaProp;
  getEmail(): JsonSchemaProp;
  getEnum(key: string, value: object): JsonSchemaProp;
  getInteger(key: string, opt?: SchemaOption): JsonSchemaProp;
  getObjectById(key: string): JsonSchemaProp;
  getPassword(key: string): JsonSchemaProp;
  getString(key: string, opt?: SchemaOption): JsonSchemaProp;
}
