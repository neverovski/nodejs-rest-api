import { DatabaseError } from 'pg';
import {
  DeepPartial,
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
import { DbConnection, DbUtil } from '@db';

export class RepositoryCore<E extends Id & ObjectLiteral = any> {
  protected readonly alias: string;
  protected orm: Repository<E>;

  constructor(entity: EntityTarget<E>, alias?: string) {
    this.orm = DbConnection.dataSource.getRepository(entity);

    this.alias = alias || 'entity';
  }

  async create<T extends ObjectLiteral = any>(
    body: DeepPartial<T>,
  ): Promise<E> {
    try {
      return await this.orm
        .createQueryBuilder()
        .insert()
        .values(body as unknown as E)
        .returning('*')
        .execute()
        .then((res) => res?.generatedMaps[0] as E);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async delete(query: DeepPartial<E>): Promise<void> {
    try {
      await this.orm.delete(query);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOne(options: FindOneOptions<E>): Promise<E | null> {
    try {
      return await this.orm.findOne(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOneOrFail(options: FindOneOptions<E>): Promise<E> {
    try {
      return await this.orm.findOneOrFail(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async update<T extends ObjectLiteral = any>(
    query: DeepPartial<T>,
    partialBody: DeepPartial<T>,
  ): Promise<void> {
    try {
      await this.orm.update(query, partialBody);
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
      return DbUtil.handlerError(err.driverError as DatabaseError);
    }

    return new InternalServerErrorException();
  }
}
