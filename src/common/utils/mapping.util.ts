import { plainToInstance } from 'class-transformer';

import { MappingTransform } from '@common/types';

export class MappingUtil {
  static toDto<T, C>({ data, options, cls }: MappingTransform<T, C>): T {
    return (cls ? plainToInstance(cls, data, options) : data) as T;
  }
}
