import { JSONSchemaCustom } from '@core';

export const USER_RELATION = {
  profile: true,
};

export const PROFILE_SCHEMA = {
  profile: {
    type: 'object',
    additionalProperties: false,
    minProperties: 1,
    properties: {
      firstName: {
        type: 'string',
        transform: ['trim'],
        sanitize: 'escape',
        minLength: 1,
        maxLength: 100,
      },
      lastName: {
        type: 'string',
        transform: ['trim'],
        sanitize: 'escape',
        minLength: 1,
        maxLength: 100,
      },
    },
  },
} as { [key: string]: JSONSchemaCustom };
