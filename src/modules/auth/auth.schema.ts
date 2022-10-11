import { EMAIL_PROPERTY, IJsonSchema } from '@core/schema';
import { SocialNetwork } from '@utils';
import { SchemaHelper } from '@utils/helpers';

export const ForgotPasswordSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: { type: 'object', maxProperties: 0 },
  body: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    required: ['email'],
    properties: {
      ...EMAIL_PROPERTY,
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
      ...EMAIL_PROPERTY,
      ...SchemaHelper.getPassword(),
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
      ...SchemaHelper.getString('refreshToken'),
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
      ...SchemaHelper.getEnum('platform', SocialNetwork),
      ...SchemaHelper.getString('token'),
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
      ...SchemaHelper.getString('token'),
      ...SchemaHelper.getPassword(),
    },
  },
};
