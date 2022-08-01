import { EMAIL_SCHEMA, IJsonSchema, PASSWORD_SCHEMA } from '@core/schema';
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
      ...EMAIL_SCHEMA,
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
      ...EMAIL_SCHEMA,
      ...PASSWORD_SCHEMA,
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

export const PlatformSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['token', 'platform'],
    properties: {
      platform: {
        type: 'string',
        enum: Object.values(SocialNetwork),
      },
      token: {
        type: 'string',
        transform: ['trim'],
        minLength: 1,
      },
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
      token: {
        type: 'string',
        minLength: 1,
      },
      ...PASSWORD_SCHEMA,
    },
  },
};
