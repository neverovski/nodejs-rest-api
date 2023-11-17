import {
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  ObjectLiteral,
  TableCheckOptions,
  TableUniqueOptions,
} from 'typeorm';

export type SelectParam<T = ObjectLiteral> = FindOptionsSelect<T>;
export type RelationParam<T = ObjectLiteral> = FindOptionsRelations<T>;
export type WhereParam<T = ObjectLiteral> =
  | FindOptionsWhere<T>[]
  | FindOptionsWhere<T>;

export type FindOption<T = ObjectLiteral> = Omit<
  FindManyOptions<T>,
  'skip' | 'take'
>;

export type DatabaseClient = 'mysql' | 'mariadb' | 'postgres';

export type CheckOptions = Required<
  Pick<TableCheckOptions, 'name' | 'expression'>
> &
  Partial<Omit<TableCheckOptions, 'name' | 'expression'>>;

export type UniqueOptions = Required<
  Pick<TableUniqueOptions, 'name' | 'columnNames'>
> &
  Partial<Omit<TableUniqueOptions, 'name' | 'columnNames'>>;

export type RepositoryCtx<T = any> = {
  entity?: EntityTarget<T>;
  manager?: EntityManager;
};
