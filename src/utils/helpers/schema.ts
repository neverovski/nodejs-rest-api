import { i18n } from '@lib';
import {
  JSONSchemaCustom,
  MAX_SORT_STRING_LENGTH,
  MIN_PASSWORD_LENGTH,
  OptionNumberSchema,
  OptionStringSchema,
  SORT,
} from '@utils';

import * as StringHelper from './string';

export const getBoolean = (
  prop: string,
): { [key: string]: JSONSchemaCustom } => ({
  [prop]: {
    type: 'boolean',
    errorMessage: {
      type: i18n()['validate.boolean'],
    },
  },
});

export const getEnum = (
  prop: string,
  value: object,
): { [key: string]: JSONSchemaCustom } => ({
  [prop]: {
    type: 'string',
    enum: Object.values(value),
  },
});

export const getInteger = (
  prop: string,
  opt?: OptionNumberSchema,
): { [prop: string]: JSONSchemaCustom } => {
  const minimum = opt?.minimum ?? 1;
  const maximum = opt?.maximum ?? 0;

  return {
    [prop]: {
      type: 'integer',
      minimum,
      ...(maximum && { maximum }),
      errorMessage: {
        type: i18n()['validate.integer'],
        minimum: StringHelper.replace(i18n()['validate.minimum'], {
          size: minimum,
        }),
        maximum: StringHelper.replace(i18n()['validate.maximum'], {
          size: maximum,
        }),
      },
    },
  };
};

export const getNumber = (
  prop: string,
  opt?: OptionNumberSchema,
): { [key: string]: JSONSchemaCustom } => {
  const minimum = opt?.minimum ?? 1;
  const maximum = opt?.maximum ?? 0;

  return {
    [prop]: {
      type: 'number',
      minimum,
      ...(maximum && { maximum }),
      errorMessage: {
        type: i18n()['validate.number'],
        minimum: StringHelper.replace(i18n()['validate.minimum'], {
          size: minimum,
        }),
        maximum: StringHelper.replace(i18n()['validate.maximum'], {
          size: maximum,
        }),
      },
    },
  };
};

export const getObjectById = (
  prop: string,
): { [key: string]: JSONSchemaCustom } => ({
  [prop]: {
    type: ['object', 'null'],
    properties: {
      ...getInteger('id'),
    },
  },
});

export const getOrder = (prop: string): JSONSchemaCustom => ({
  type: 'object',
  additionalProperties: false,
  properties: {
    [prop]: {
      type: 'string',
      enum: SORT,
      transform: ['toUpperCase'],
    },
  },
});

export const getPassword = (
  prop = 'password',
): { [key: string]: JSONSchemaCustom } => ({
  [prop]: {
    type: 'string',
    transform: ['trim'],
    minLength: MIN_PASSWORD_LENGTH,
    errorMessage: {
      type: i18n()['validate.string'],
      minLength: StringHelper.replace(i18n()['validate.minLength'], {
        size: MIN_PASSWORD_LENGTH,
      }),
    },
  },
});

export const getString = (
  prop: string,
  opt?: OptionStringSchema,
): { [key: string]: JSONSchemaCustom } => {
  const minLength = opt?.minLength ?? 1;
  const maxLength = opt?.maxLength ?? MAX_SORT_STRING_LENGTH;

  return {
    [prop]: {
      type: 'string',
      transform: ['trim'],
      sanitize: 'escape',
      minLength,
      maxLength,
      errorMessage: {
        type: i18n()['validate.string'],
        minLength: StringHelper.replace(i18n()['validate.minLength'], {
          size: minLength,
        }),
        maxLength: StringHelper.replace(i18n()['validate.maxLength'], {
          size: maxLength,
        }),
      },
    },
  };
};

export const getStringAnyOf = (
  prop: string,
  opt?: OptionStringSchema,
): { [key: string]: JSONSchemaCustom } => ({
  [prop]: {
    anyOf: [
      {
        type: 'null',
      },
      {
        type: 'string',
        maxLength: 0,
      },
      {
        type: 'string',
        transform: ['trim'],
        sanitize: 'escape',
        minLength: opt?.minLength ?? 1,
        maxLength: opt?.maxLength ?? MAX_SORT_STRING_LENGTH,
      },
    ],
  },
});
