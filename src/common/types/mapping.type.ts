import { ClassConstructor, ClassTransformOptions } from 'class-transformer';

import { PageOptionDto } from '@common/dtos';

export type MappingParams<T, V> = {
  cls?: ClassConstructor<T>;
  data: V;
  itemCount?: number;
  options?: ClassTransformOptions;
  pageOption?: PageOptionDto;
};
