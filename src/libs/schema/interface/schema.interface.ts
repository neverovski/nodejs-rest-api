import { JSONSchemaCustom, SchemaOption } from '../schema.type';

export interface ISchema {
  getBoolean(prop: string): { [prop: string]: JSONSchemaCustom };
  getEmail(): { email: JSONSchemaCustom };
  getEnum(prop: string, value: object): { [prop: string]: JSONSchemaCustom };
  getInteger(
    prop: string,
    opt?: SchemaOption,
  ): { [prop: string]: JSONSchemaCustom };
  getNumber(
    prop: string,
    opt?: SchemaOption,
  ): { [key: string]: JSONSchemaCustom };
  getPassword(prop: string): { [prop: string]: JSONSchemaCustom };
  getString(
    prop: string,
    opt?: SchemaOption,
  ): { [prop: string]: JSONSchemaCustom };
}
