import { MAX_NAME_LENGTH } from '@common/constants';
import { JsonSchema, JsonSchemaProp } from '@common/types';
import { SchemaCore } from '@core/schema';

import { IUserSchema } from './interface';

export class UserSchema extends SchemaCore implements IUserSchema {
  private get profile(): JsonSchemaProp {
    return {
      ...this.getString('firstName', { maxLength: MAX_NAME_LENGTH }),
      ...this.getString('lastName', { maxLength: MAX_NAME_LENGTH }),
    };
  }

  changePassword(): JsonSchema {
    return {
      $id: this.getIdKey('changePassword'),
      type: 'object',
      additionalProperties: false,
      properties: {
        ...this.getPassword('newPassword'),
        ...this.getPassword('oldPassword'),
      },
    };
  }

  create(): JsonSchema {
    return {
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
    };
  }

  update(): JsonSchema {
    return {
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
    };
  }
}
