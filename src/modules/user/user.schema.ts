import { EMAIL_PROPERTY, IJsonSchema } from '@core/schema';
import { SchemaHelper } from '@utils/helpers';

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
      ...EMAIL_PROPERTY,
      ...SchemaHelper.getPassword(),
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
      ...EMAIL_PROPERTY,
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
      ...SchemaHelper.getPassword('oldPassword'),
      ...SchemaHelper.getPassword('newPassword'),
    },
  },
};
