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

export type OptionNumberSchema = {
  maximum?: number;
  minimum?: number;
};

export type OptionStringSchema = {
  maxLength?: number;
  minLength?: number;
};
