import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

import { HttpStatus } from '@common/enums';

import { FindOption } from './sql.type';

export type Context<T = ObjectLiteral> = Partial<
  PayloadContext &
    Pick<FindOption<T>, 'relations' | 'select' | 'order'> & {
      cacheKey: string;
    }
>;

export type ResponseCtx = {
  status?: HttpStatus;
};
