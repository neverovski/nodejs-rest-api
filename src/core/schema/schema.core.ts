import {
  BIG_INT,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@common/constants';
import { PAGE_SCHEMA, PAGE_UNLIMIT_ITEM_SCHEMA } from '@common/schemas';
import { JsonSchema, JsonSchemaCtx, JsonSchemaProperty } from '@common/types';
import { StringUtil } from '@common/utils';
import { i18n } from '@i18n';

import { ISchema } from './interface';

export class SchemaCore implements ISchema {
  getPage(): JsonSchema {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        ...PAGE_SCHEMA,
      },
    };
  }

  getPageUnlimit(): JsonSchema {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        ...PAGE_UNLIMIT_ITEM_SCHEMA,
      },
    };
  }

  protected getBoolean(key: string): JsonSchemaProperty {
    return {
      [key]: {
        type: 'boolean',
        errorMessage: {
          type: i18n()['validate.boolean'],
        },
      },
    };
  }

  protected getDate(key: string): JsonSchemaProperty {
    return {
      [key]: {
        type: ['string', 'null'],
        format: 'date',
      },
    };
  }

  protected getDateTime(key: string): JsonSchemaProperty {
    return {
      [key]: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    };
  }

  protected getEmail(): JsonSchemaProperty {
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

  protected getEnum(key: string, value: object): JsonSchemaProperty {
    return {
      [key]: {
        type: 'string',
        enum: Object.values(value),
      },
    };
  }

  protected getIdKey(schemaName: string) {
    return `${this.constructor.name}/${schemaName}`;
  }

  protected getInteger(key: string, opt?: JsonSchemaCtx): JsonSchemaProperty {
    const minimum = opt?.minimum ?? 1;
    const maximum = opt?.maximum ?? BIG_INT;

    return {
      [key]: {
        type: opt?.isOptional ? ['integer', 'null'] : 'integer',
        minimum,
        format: 'int64',
        ...(maximum && { maximum }),
        errorMessage: {
          type: i18n()['validate.integer'],
          minimum: StringUtil.replace(i18n()['validate.minimum'], {
            size: minimum,
          }),
          ...(maximum && {
            maximum: StringUtil.replace(i18n()['validate.maximum'], {
              size: maximum,
            }),
          }),
        },
      },
    };
  }

  protected getObjectById(key: string): JsonSchemaProperty {
    return {
      [key]: {
        type: ['object', 'null'],
        properties: {
          ...this.getInteger('id'),
        },
      },
    };
  }

  protected getPassword(key = 'password'): JsonSchemaProperty {
    return {
      [key]: {
        type: 'string',
        transform: ['trim'],
        minLength: MIN_PASSWORD_LENGTH,
        maxLength: MAX_PASSWORD_LENGTH,
        errorMessage: {
          type: i18n()['validate.string'],
        },
      },
    };
  }

  protected getString(key: string, opt?: JsonSchemaCtx): JsonSchemaProperty {
    const { isOptional, ...param } = opt || { isOptional: false };
    const minLength = isOptional ? 0 : opt?.minLength ?? 1;
    const maxLength = opt?.maxLength;

    return {
      [key]: {
        type: isOptional ? ['string', 'null'] : 'string',
        transform: ['trim'],
        ...param,
        minLength,
        ...(maxLength && { maxLength }),
        errorMessage: {
          type: i18n()['validate.string'],
          minLength: StringUtil.replace(i18n()['validate.minLength'], {
            size: minLength,
          }),
          ...(maxLength && {
            maxLength: StringUtil.replace(i18n()['validate.maxLength'], {
              size: maxLength,
            }),
          }),
          ...(param.format && {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            format: i18n()[`validate.format.${param.format}`] || '',
          }),
        },
      },
    };
  }
}
