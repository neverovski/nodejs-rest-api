import { PageOptionDto } from '@common/dtos';

import { MappingTransform } from './mapping.type';

export type TransformCtx<T, C> = {
  dataClass: MappingTransform<T, C>['cls'];
  itemCount?: number;
  pagination?: PageOptionDto;
  transformOptions?: MappingTransform<T, C>['options'];
};
