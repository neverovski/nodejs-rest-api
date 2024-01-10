import { PlatformName } from '@common/enums';
import { JsonSchemaOptions } from '@common/types';
import { SchemaCore } from '@core/schema';

import { IAuthSchema } from './interface';

export class AuthSchema extends SchemaCore implements IAuthSchema {
  forgotPasswordByEmail(): JsonSchemaOptions {
    return {
      body: {
        $id: this.getIdKey('forgotPasswordByEmail'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['email'],
        properties: this.getEmail(),
      },
    };
  }

  login(): JsonSchemaOptions {
    return {
      body: {
        $id: this.getIdKey('login'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['email', 'password'],
        properties: {
          ...this.getEmail(),
          ...this.getPassword(),
        },
      },
    };
  }

  platform(): JsonSchemaOptions {
    return {
      body: {
        $id: this.getIdKey('platform'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['token', 'platform'],
        properties: {
          ...this.getEnum('platform', PlatformName),
          ...this.getString('token'),
        },
      },
    };
  }

  refreshToken(): JsonSchemaOptions {
    return {
      body: {
        $id: this.getIdKey('refreshToken'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        properties: {
          ...this.getString('refreshToken'),
        },
      },
    };
  }

  resetPasswordByEmail(): JsonSchemaOptions {
    return {
      body: {
        $id: this.getIdKey('resetPasswordByEmail'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['code', 'password', 'email'],
        properties: {
          ...this.getEmail(),
          ...this.getString('code'),
          ...this.getPassword('password'),
        },
      },
    };
  }

  verifyEmailByCode(): JsonSchemaOptions {
    return {
      params: {
        $id: this.getIdKey('resetPasswordByEmail'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['code'],
        properties: {
          ...this.getString('code'),
        },
      },
    };
  }
}
