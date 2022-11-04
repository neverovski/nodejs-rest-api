import { IJsonSchema, Schema } from '@lib';
import { SocialNetwork } from '@utils';

export const ForgotPasswordSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['email'],
    properties: {
      ...Schema.getEmail(),
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
      ...Schema.getEmail(),
      ...Schema.getPassword(),
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
    properties: {
      ...Schema.getString('refreshToken'),
    },
  },
};

export const LogoutSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: { type: 'object', maxProperties: 0 },
};

export const PlatformSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['token', 'platform'],
    properties: {
      ...Schema.getEnum('platform', SocialNetwork),
      ...Schema.getString('token'),
    },
  },
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
      ...Schema.getString('token'),
      ...Schema.getPassword(),
    },
  },
};
