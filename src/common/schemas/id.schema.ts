import { BIG_INT } from '@common/constants';
import { JsonSchema } from '@common/types';

export const ID_SCHEMA: JsonSchema = {
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: {
      type: 'integer',
      maximum: BIG_INT,
    },
  },
};
