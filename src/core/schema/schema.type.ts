import { i18n } from '@lib';
import { JSONSchemaCustom } from '@utils';

import * as StringHelper from '../../utils/helpers/string';

export interface IJsonSchema {
  body: JSONSchemaCustom | { [key: string]: Partial<JSONSchemaCustom> };
  params: JSONSchemaCustom;
  query: JSONSchemaCustom;
}

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
