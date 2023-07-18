import {
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOptionsRelations,
  ObjectLiteral,
  SelectQueryBuilder,
  TableCheckOptions,
  TableUniqueOptions,
} from 'typeorm';

import { Strategy } from '@common/enums';

export type SortParam<Entity = ObjectLiteral> =
  FindManyOptions<Entity>['order'];

export type OptionManyCtx<Entity = ObjectLiteral, W = ObjectLiteral> = Omit<
  FindManyOptions<Entity>,
  'skip' | 'take' | 'relations' | 'select' | 'where' | 'order'
> & {
  alias?: string;
  isNotLimit?: boolean;
  limit?: number;
  offset?: number;
  relations?: FindOptionsRelations<Entity> | null;
  searchColumns?: object;
  select?: string[];
  sort?: SortParam<Entity> | Id[];
  strategy?: Strategy;
  where?: W;
};

export type OptionInsert = {
  isConflict?: boolean;
};

export type OptionOneCtx<Entity = ObjectLiteral> = Omit<
  OptionManyCtx<Entity>,
  'limit' | 'offset'
>;

export type SqlRangeType<Entity extends ObjectLiteral> = {
  abs?: boolean;
  alias: string;
  key: string;
  queryBuilder: SelectQueryBuilder<Entity>;
  range?: RangeType;
  type?: 'date' | 'number' | 'date-time';
};

export type SqlRelation<Entity extends ObjectLiteral> = Required<
  Pick<OptionManyCtx<Entity>, 'alias' | 'relations'>
> &
  Pick<OptionManyCtx<Entity>, 'strategy'> & {
    queryBuilder: SelectQueryBuilder<Entity>;
  };

export type DbClient = 'mysql' | 'mariadb' | 'postgres';

export type RangeType = {
  max?: number | string | Date;
  min?: number | string | Date;
};

export type CheckOptions = Required<
  Pick<TableCheckOptions, 'name' | 'expression'>
> &
  Partial<Omit<TableCheckOptions, 'name' | 'expression'>>;

export type UniqueOptions = Required<
  Pick<TableUniqueOptions, 'name' | 'columnNames'>
> &
  Partial<Omit<TableUniqueOptions, 'name' | 'columnNames'>>;

export type QueryParam = {
  createdAt?: RangeType;
  ids?: number | number[];
  search?: string;
};

export type ContextManager<T = any> = {
  entity?: EntityTarget<T>;
  isConflict?: boolean;
  isManyToManyRelationship?: boolean;
  manager?: EntityManager;
};
