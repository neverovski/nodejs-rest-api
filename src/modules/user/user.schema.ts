import { MAX_NAME_LENGTH } from '@common/constants';
import { JsonSchemaProp, JsonSchemaRequest } from '@common/types';
import { SchemaCore } from '@core/schema';

import { IUserSchema } from './interface';

export class UserSchema extends SchemaCore implements IUserSchema {
  private get profile(): JsonSchemaProp {
    return {
      ...this.getString('firstName', { maxLength: MAX_NAME_LENGTH }),
      ...this.getString('lastName', { maxLength: MAX_NAME_LENGTH }),
    };
  }

  changePassword(): JsonSchemaRequest {
    return {
      body: {
        $id: this.getIdKey('changePassword'),
        type: 'object',
        additionalProperties: false,
        properties: {
          ...this.getPassword('newPassword'),
          ...this.getPassword('oldPassword'),
        },
      },
      params: null,
      query: null,
    };
  }

  create(): JsonSchemaRequest {
    return {
      body: {
        $id: this.getIdKey('create'),
        type: 'object',
        additionalProperties: false,
        required: ['password', 'email', 'profile'],
        properties: {
          ...this.getEmail(),
          ...this.getPassword(),
          profile: {
            type: 'object',
            additionalProperties: false,
            required: ['firstName', 'lastName'],
            properties: this.profile,
          },
        },
      },
      params: null,
      query: null,
    };
  }

  update(): JsonSchemaRequest {
    return {
      body: {
        $id: this.getIdKey('update'),
        type: 'object',
        additionalProperties: false,
        required: ['profile'],
        properties: {
          profile: {
            type: 'object',
            additionalProperties: false,
            minProperties: 1,
            properties: this.profile,
          },
        },
      },
      params: null,
      query: null,
    };
  }
}
