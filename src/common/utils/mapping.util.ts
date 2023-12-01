import { plainToInstance } from 'class-transformer';

import { MappingParams } from '@common/types';

export class MappingUtil {
  static objToDto<T extends Record<string, any>, V extends Array<any>>(
    params: MappingParams<T, V>,
  ): T[];
  static objToDto<T extends Record<string, any>, V>(
    params: MappingParams<T, V>,
  ): T;
  static objToDto<T extends Record<string, any>, V>({
    data,
    options,
    cls,
  }: MappingParams<T, V | V[]>): T | T[] {
    return cls
      ? plainToInstance(cls, data, options)
      : (data as unknown as T | T[]);
  }
}
