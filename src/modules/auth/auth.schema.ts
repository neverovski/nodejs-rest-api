import { IJsonSchema } from '@core';

export const ForgotPasswordSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        transform: ['trim', 'toLowerCase'],
      },
    },
  },
};

export const LoginSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['email', 'password'],
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
    },
  },
};

export const RefreshTokenSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['refreshToken'],
    properties: {
      refreshToken: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

export const LogoutSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: { type: 'object', maxProperties: 0 },
};

export const ResetPasswordSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['token', 'password'],
    properties: {
      token: {
        type: 'string',
        minLength: 1,
      },
      password: {
        type: 'string',
        minLength: 6,
      },
    },
  },
};
