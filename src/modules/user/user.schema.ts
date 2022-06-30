import { IJsonSchema, EMAIL_SCHEMA, PASSWORD_SCHEMA } from '@core/schema';

import { PROFILE_SCHEMA } from './user.constant';

export const CreateUserSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['email', 'profile', 'password'],
    properties: {
      ...EMAIL_SCHEMA,
      ...PASSWORD_SCHEMA,
      ...PROFILE_SCHEMA,
    },
  },
};

export const UpdateUserSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['profile'],
    properties: {
      ...EMAIL_SCHEMA,
      ...PROFILE_SCHEMA,
    },
  },
};

export const ChangePasswordSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['oldPassword', 'newPassword'],
    properties: {
      oldPassword: {
        type: 'string',
        transform: ['trim'],
        minLength: 6,
      },
      newPassword: {
        type: 'string',
        transform: ['trim'],
        minLength: 6,
      },
    },
  },
};
