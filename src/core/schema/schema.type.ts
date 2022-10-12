import { i18n } from '@lib';
import { JSONSchemaCustom } from '@utils';

import * as SchemaHelper from '../../utils/helpers/schema';
import * as StringHelper from '../../utils/helpers/string';

export interface IJsonSchema {
  body: JSONSchemaCustom | { [key: string]: Partial<JSONSchemaCustom> };
  params: JSONSchemaCustom;
  query: JSONSchemaCustom;
}

export const PAGE_PROPERTY = {
  ...SchemaHelper.getInteger('limit'),
  ...SchemaHelper.getInteger('page', { minimum: 0 }),
} as { [key: string]: JSONSchemaCustom };

export const ID_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: SchemaHelper.getInteger('id'),
  },
} as JSONSchemaCustom;

export const EMAIL_PROPERTY = {
  email: {
    type: 'string',
    format: 'email',
    transform: ['trim', 'toLowerCase'],
    errorMessage: {
      type: i18n()['validate.string'],
      format: StringHelper.replace(i18n()['validate.string.format'], {
        format: 'test@test.com',
      }),
    },
  },
} as { [key: string]: JSONSchemaCustom };
