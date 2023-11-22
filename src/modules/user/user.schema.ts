import { MAX_NAME_LENGTH } from '@common/constants';
import { JsonSchemaOptions, JsonSchemaProperty } from '@common/types';
import { SchemaCore } from '@core/schema';

import { IUserSchema } from './interface';

export class UserSchema extends SchemaCore implements IUserSchema {
  private get profile(): JsonSchemaProperty {
    return {
      ...this.getString('firstName', { maxLength: MAX_NAME_LENGTH }),
      ...this.getString('lastName', { maxLength: MAX_NAME_LENGTH }),
    };
  }

  changePassword(): JsonSchemaOptions {
    return {
      body: {
        $id: this.getIdKey('changePassword'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        properties: {
          ...this.getPassword('newPassword'),
          ...this.getPassword('oldPassword'),
        },
      },
    };
  }

  create(): JsonSchemaOptions {
    return {
      body: {
        $id: this.getIdKey('create'),
        $schema: 'http://json-schema.org/draft-07/schema#',
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
    };
  }

  update(): JsonSchemaOptions {
    return {
      body: {
        $id: this.getIdKey('update'),
        $schema: 'http://json-schema.org/draft-07/schema#',
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
    };
  }
}
