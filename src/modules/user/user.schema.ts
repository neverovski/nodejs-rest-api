import { IJsonSchema, JSONSchemaCustom, Schema } from '@libs';
import { MAX_NAME_LENGTH } from '@utils';

const PROFILE_PROPERTY = {
  profile: {
    type: 'object',
    additionalProperties: false,
    minProperties: 1,
    properties: {
      ...Schema.getString('firstName', { maxLength: MAX_NAME_LENGTH }),
      ...Schema.getString('lastName', { maxLength: MAX_NAME_LENGTH }),
    },
  },
} as { [key: string]: JSONSchemaCustom };

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
