import { plainToInstance } from 'class-transformer';

import { TransformDTO } from '@utils';

export const toDTO = <T, DTO>({
  data,
  options,
  dto,
}: TransformDTO<T, DTO>): T => {
  return (dto ? plainToInstance(dto, data, options) : data) as T;
};
