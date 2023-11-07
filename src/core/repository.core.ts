import { DatabaseError } from 'pg';
import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindOneOptions,
  ObjectLiteral,
  QueryFailedError,
  Repository,
} from 'typeorm';

import {
  InternalServerErrorException,
  NotFoundException,
} from '@common/exceptions';
import { FindOption, RepositoryCtx } from '@common/types';
import { DbConnection } from '@db';
import { DbErrorUtil } from '@db/utils';

export class RepositoryCore<T extends ObjectLiteral = any> {
  protected readonly alias: string;
  protected orm: Repository<T>;

  constructor(entity: EntityTarget<T>, alias?: string) {
    this.orm = DbConnection.dataSource.getRepository(entity);

    this.alias = alias || 'entity';
  }

  async countByQuery(options: FindOption<T>): Promise<number> {
    try {
      return await this.orm.count(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    try {
      return await this.orm
        .createQueryBuilder()
        .insert()
        .values(entity)
        .returning('*')
        .execute()
        .then((res) => res?.generatedMaps[0] as T);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async delete(query: DeepPartial<T>): Promise<void> {
    try {
      await this.orm.delete(query);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findByQuery(options: FindOption<T>): Promise<T[]> {
    try {
      return await this.orm.find(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    try {
      return await this.orm.findOne(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    try {
      return await this.orm.findOneOrFail(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async update(query: DeepPartial<T>, entity: DeepPartial<T>): Promise<void> {
    try {
      await this.orm.update(query, entity);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  protected handleError(err: unknown) {
    if (
      (err as Error)?.name === 'EntityNotFound' ||
      (err as Error)?.name === 'EntityNotFoundError'
    ) {
      return new NotFoundException();
    }

    if (err instanceof QueryFailedError) {
      return DbErrorUtil.handler(err.driverError as DatabaseError);
    }

    return new InternalServerErrorException();
  }

  protected async transactionManager<R>(
    cb: (manager: EntityManager) => Promise<R>,
    ctx?: Partial<RepositoryCtx>,
  ) {
    if (ctx?.manager) {
      try {
        return await cb(ctx?.manager);
      } catch (err) {
        throw this.handleError(err);
      }
    }

    return this.orm.manager.transaction(async (manager) => {
      try {
        return await cb(manager);
      } catch (err) {
        throw this.handleError(err);
      }
    });
  }
}
