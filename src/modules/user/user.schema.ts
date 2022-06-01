import { IJsonSchema } from '@core';

export const CreateUserSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['email', 'profile', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        transform: ['trim', 'toLowerCase'],
      },
      password: {
        type: 'string',
        minLength: 6,
      },
      profile: {
        type: 'object',
        additionalProperties: false,
        required: ['firstName', 'lastName'],
        properties: {
          firstName: {
            type: 'string',
            minLength: 1,
          },
          lastName: {
            type: 'string',
            minLength: 1,
          },
        },
      },
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
      email: {
        type: 'string',
        format: 'email',
        transform: ['trim', 'toLowerCase'],
      },
      profile: {
        type: 'object',
        additionalProperties: false,
        minProperties: 1,
        properties: {
          firstName: {
            type: 'string',
            minLength: 1,
          },
          lastName: {
            type: 'string',
            minLength: 1,
          },
        },
      },
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
        minLength: 6,
      },
      newPassword: {
        type: 'string',
        minLength: 6,
      },
    },
  },
};
