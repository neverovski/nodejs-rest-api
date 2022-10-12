import { JSONSchemaCustom, MAX_NAME_LENGTH } from '@utils';
import { SchemaHelper } from '@utils/helpers';

export const USER_RELATION = {
  profile: true,
};

export const PROFILE_PROPERTY = {
  profile: {
    type: 'object',
    additionalProperties: false,
    minProperties: 1,
    properties: {
      ...SchemaHelper.getString('firstName', { maxLength: MAX_NAME_LENGTH }),
      ...SchemaHelper.getString('lastName', { maxLength: MAX_NAME_LENGTH }),
    },
  },
} as { [key: string]: JSONSchemaCustom };
