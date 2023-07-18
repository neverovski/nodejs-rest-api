import { ClassConstructor, ClassTransformOptions } from 'class-transformer';

export type MappingTransform<T, C> = {
  cls?: ClassConstructor<C>;
  data: T;
  options?: ClassTransformOptions;
};
