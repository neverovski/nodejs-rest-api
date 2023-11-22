import {
  BIG_INT,
  MAX_LIMIT_ITEM,
  MIN_LIMIT_ITEM,
  UNLIMIT_ITEM,
} from '@common/constants';
import { JsonSchemaProperty } from '@common/types';

export const PAGE_UNLIMIT_ITEM_SCHEMA: JsonSchemaProperty = {
  limit: {
    type: 'integer',
    minimum: MIN_LIMIT_ITEM,
    maximum: MAX_LIMIT_ITEM,
  },
  page: {
    type: 'integer',
    minimum: UNLIMIT_ITEM,
    maximum: BIG_INT,
  },
};
