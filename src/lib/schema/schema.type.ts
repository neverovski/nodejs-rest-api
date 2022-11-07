import { JSONSchema7 } from 'json-schema';

export interface IJsonSchema {
  body: JSONSchemaCustom | { [key: string]: Partial<JSONSchemaCustom> };
  params: JSONSchemaCustom;
  query: JSONSchemaCustom;
}

export interface JSONSchemaCustom extends JSONSchema7 {
  consumes?: string[];
  properties?: {
    [key: string]: JSONSchemaCustom | boolean;
  };
  transform?: string[];
}

export type SchemaOption = {
  isNull?: boolean;
  maxLength?: number;
  maximum?: number;
  minLength?: number;
  minimum?: number;
};
