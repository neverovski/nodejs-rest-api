import { JsonSchema } from '@common/types';

export interface ISchema {
  getPage(): JsonSchema;
  getPageUnlimit(): JsonSchema;
}
