import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

import { FindOption } from './sql.type';

export type Context<T = ObjectLiteral> = Partial<
  PayloadContext &
    Pick<FindOption<T>, 'relations' | 'select' | 'order'> & {
      cacheKey: string;
    }
>;
