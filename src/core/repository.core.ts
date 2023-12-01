import { DatabaseError } from 'pg';
import {
  DataSource,
  DeepPartial,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  QueryFailedError,
  Repository,
} from 'typeorm';

import {
  InternalServerErrorException,
  NotFoundException,
} from '@common/exceptions';
import { FindOption, RepositoryCtx } from '@common/types';
import {
  DEFAULT_ALIAS,
  ENTITY_NOT_FOUND,
  ENTITY_NOT_FOUND_ERROR,
} from '@database/constants';
import { DatabaseErrorUtil } from '@database/utils';

export class RepositoryCore<T extends ObjectLiteral = any> {
  protected readonly alias: string;
  protected readonly repository: Repository<T>;

  constructor(dataSource: DataSource, entity: EntityTarget<T>) {
    this.repository = dataSource.getRepository(entity);

    this.alias = DEFAULT_ALIAS;
  }

  async countByQuery(options: FindOption<T>): Promise<number> {
    try {
      return await this.repository.count(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    try {
      return await this.repository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .returning('*')
        .execute()
        .then((res) => res?.generatedMaps?.[0] as T);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async delete(query: DeepPartial<T>): Promise<void> {
    try {
      await this.repository.delete(query);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findByQuery(options: FindOption<T>): Promise<T[]> {
    try {
      return await this.repository.find(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOne(options: FindOption<T>): Promise<T | null> {
    try {
      return await this.repository.findOne(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOneOrFail(options: FindOption<T>): Promise<T> {
    try {
      return await this.repository.findOneOrFail(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async update(query: DeepPartial<T>, entity: DeepPartial<T>): Promise<void> {
    try {
      await this.repository.update(query, entity);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  protected handleError(err: unknown) {
    if (
      (err as Error)?.name === ENTITY_NOT_FOUND ||
      (err as Error)?.name === ENTITY_NOT_FOUND_ERROR
    ) {
      return new NotFoundException();
    }

    if (err instanceof QueryFailedError) {
      return DatabaseErrorUtil.handler(err.driverError as DatabaseError);
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

    return this.repository.manager.transaction(async (manager) => {
      try {
        return await cb(manager);
      } catch (err) {
        throw this.handleError(err);
      }
    });
  }
}
