import {
  BIG_INT,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@common/constants';
import { ISchema } from '@common/interfaces';
import { JsonSchemaProp, SchemaOption } from '@common/types';
import { StringUtil } from '@common/utils';
import { i18n } from '@i18n';

export class SchemaCore implements ISchema {
  getBoolean(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: 'boolean',
        errorMessage: {
          type: i18n()['validate.boolean'],
        },
      },
    };
  }

  getEmail(): JsonSchemaProp {
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

  getEnum(key: string, value: object): JsonSchemaProp {
    return {
      [key]: {
        type: 'string',
        enum: Object.values(value),
      },
    };
  }

  getInteger(key: string, opt?: SchemaOption): JsonSchemaProp {
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

  getObjectById(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: ['object', 'null'],
        properties: {
          ...this.getInteger('id'),
        },
      },
    };
  }

  getPassword(key = 'password'): JsonSchemaProp {
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

  getString(key: string, opt?: SchemaOption): JsonSchemaProp {
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
