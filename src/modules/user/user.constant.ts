import { JSONSchemaCustom, Schema } from '@lib';
import { MAX_NAME_LENGTH } from '@utils';

export const USER_RELATION = {
  profile: true,
};

export const PROFILE_PROPERTY = {
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
