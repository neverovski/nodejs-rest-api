import { JSONSchema7 } from 'json-schema';

export interface JSONSchemaCustom extends JSONSchema7 {
  transform?: string[];
  consumes?: string[];
  properties?: {
    [key: string]: JSONSchemaCustom | boolean;
  };
}

export interface IJsonSchema {
  params: JSONSchemaCustom;
  query: JSONSchemaCustom;
  body: JSONSchemaCustom | { [key: string]: Partial<JSONSchemaCustom> };
}

export const PAGE_SCHEMA = {
  limit: {
    type: 'integer',
    minimum: 1,
  },
  page: {
    type: 'integer',
    minimum: 0,
  },
} as { [key: string]: JSONSchemaCustom | boolean };

export const ID_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: {
      type: 'integer',
    },
  },
} as JSONSchemaCustom;
