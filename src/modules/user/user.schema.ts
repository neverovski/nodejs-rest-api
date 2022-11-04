import { IJsonSchema, Schema } from '@lib';

import { PROFILE_PROPERTY } from './user.constant';

export const CreateUserSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['email', 'profile', 'password'],
    properties: {
      ...Schema.getEmail(),
      ...Schema.getPassword(),
      ...PROFILE_PROPERTY,
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
      ...Schema.getEmail(),
      ...PROFILE_PROPERTY,
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
      ...Schema.getPassword('oldPassword'),
      ...Schema.getPassword('newPassword'),
    },
  },
};
