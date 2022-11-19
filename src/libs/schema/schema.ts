import {
  MAX_SORT_STRING_LENGTH,
  MIN_PASSWORD_LENGTH,
  StringUtil,
} from '@utils';

import { i18n } from '../i18n';

import { ISchema } from './interface';
import { JSONSchemaCustom, SchemaOption } from './schema.type';

class Schema implements ISchema {
  getBoolean(prop: string): { [prop: string]: JSONSchemaCustom } {
    return {
      [prop]: {
        type: 'boolean',
        errorMessage: {
          type: i18n()['validate.boolean'],
        },
      },
    };
  }

  getEmail(): { email: JSONSchemaCustom } {
    return {
      email: {
        type: 'string',
        format: 'email',
        transform: ['trim', 'toLowerCase'],
        errorMessage: {
          type: i18n()['validate.string'],
          format: StringUtil.replace(i18n()['validate.string.format'], {
            format: 'test@test.com',
          }),
        },
      },
    };
  }

  getEnum(prop: string, value: object): { [prop: string]: JSONSchemaCustom } {
    return {
      [prop]: {
        type: 'string',
        enum: Object.values(value),
      },
    };
  }

  getInteger(
    prop: string,
    opt?: SchemaOption,
  ): { [prop: string]: JSONSchemaCustom } {
    const minimum = opt?.minimum ?? 1;
    const maximum = opt?.maximum ?? 0;

    return {
      [prop]: {
        type: 'integer',
        minimum,
        ...(maximum && { maximum }),
        errorMessage: {
          type: i18n()['validate.integer'],
          minimum: StringUtil.replace(i18n()['validate.minimum'], {
            size: minimum,
          }),
          maximum: StringUtil.replace(i18n()['validate.maximum'], {
            size: maximum,
          }),
        },
      },
    };
  }

  getNumber(
    prop: string,
    opt?: SchemaOption,
  ): { [prop: string]: JSONSchemaCustom } {
    const minimum = opt?.minimum ?? 1;
    const maximum = opt?.maximum ?? 0;

    return {
      [prop]: {
        type: 'number',
        minimum,
        ...(maximum && { maximum }),
        errorMessage: {
          type: i18n()['validate.number'],
          minimum: StringUtil.replace(i18n()['validate.minimum'], {
            size: minimum,
          }),
          maximum: StringUtil.replace(i18n()['validate.maximum'], {
            size: maximum,
          }),
        },
      },
    };
  }

  getPassword(prop = 'password'): { [prop: string]: JSONSchemaCustom } {
    return {
      [prop]: {
        type: 'string',
        transform: ['trim'],
        minLength: MIN_PASSWORD_LENGTH,
        errorMessage: {
          type: i18n()['validate.string'],
          minLength: StringUtil.replace(i18n()['validate.minLength'], {
            size: MIN_PASSWORD_LENGTH,
          }),
        },
      },
    };
  }

  getString(
    prop: string,
    opt?: SchemaOption,
  ): { [prop: string]: JSONSchemaCustom } {
    const minLength = opt?.minLength ?? 1;
    const maxLength = opt?.maxLength ?? MAX_SORT_STRING_LENGTH;

    const arrNull: JSONSchemaCustom[] = opt?.isNull
      ? [
          {
            type: 'null',
          },
          {
            type: 'string',
            maxLength: 0,
          },
        ]
      : [];

    return {
      [prop]: {
        anyOf: [
          ...arrNull,
          {
            type: 'string',
            transform: ['trim'],
            sanitize: 'escape',
            minLength,
            maxLength,
            errorMessage: {
              type: i18n()['validate.string'],
              minLength: StringUtil.replace(i18n()['validate.minLength'], {
                size: minLength,
              }),
              maxLength: StringUtil.replace(i18n()['validate.maxLength'], {
                size: maxLength,
              }),
            },
          },
        ],
      },
    };
  }
}

export default new Schema();
