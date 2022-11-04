import {
  JSONSchemaCustom,
  OptionNumberSchema,
  OptionStringSchema,
} from '../schema.type';

export interface ISchema {
  getBoolean(prop: string): { [prop: string]: JSONSchemaCustom };
  getEmail(): { email: JSONSchemaCustom };
  getEnum(prop: string, value: object): { [prop: string]: JSONSchemaCustom };
  getInteger(
    prop: string,
    opt?: OptionNumberSchema,
  ): { [prop: string]: JSONSchemaCustom };
  getNumber(
    prop: string,
    opt?: OptionNumberSchema,
  ): { [key: string]: JSONSchemaCustom };
  getObjectById(prop: string): { [prop: string]: JSONSchemaCustom };
  getOrder(prop: string): JSONSchemaCustom;
  getPassword(prop: string): { [prop: string]: JSONSchemaCustom };
  getString(
    prop: string,
    opt?: OptionStringSchema,
  ): { [prop: string]: JSONSchemaCustom };
  getStringAnyOf(
    prop: string,
    opt?: OptionStringSchema,
  ): { [prop: string]: JSONSchemaCustom };
}
