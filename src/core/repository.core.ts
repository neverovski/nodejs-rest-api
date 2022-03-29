import { DatabaseError } from 'pg';
import {
  Repository,
  FindConditions,
  DeepPartial,
  ObjectType,
  ObjectLiteral,
  QueryFailedError,
} from 'typeorm';

import {
  OptionCtx,
  DB_UQ_USER_EMAIL,
  ResponseHelper,
  HttpExceptionType,
} from '@utils';

export default class RepositoryCore<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  async deleteEntity(query: FindConditions<Entity>): Promise<void> {
    await this.delete(query);
  }

  async findEntity(options: OptionCtx<Entity> = {}): Promise<Entity[]> {
    return this.find(options);
  }

  async findEntityOneOrFail(options: OptionCtx<Entity> = {}): Promise<Entity> {
    return this.findOneOrFail(options);
  }

  async updateEntity<T>(
    query: Partial<T>,
    body: DeepPartial<Entity>,
  ): Promise<Entity> {
    try {
      const entityFromDB = await this.findOneOrFail({ where: query });

      this.merge(entityFromDB, body);

      return await this.save(entityFromDB as DeepPartial<Entity>);
    } catch (err) {
      throw this.errorHandler(err);
    }
  }

  protected errorHandler(error: unknown) {
    if (error instanceof QueryFailedError) {
      const err = error.driverError as DatabaseError;

      switch (err.constraint) {
        case DB_UQ_USER_EMAIL:
          return ResponseHelper.error(HttpExceptionType.EMAIL_ALREADY_TAKEN);
        default:
          return error;
      }
    }

    return error;
  }

  protected async insertEntityMany<E = Entity>(
    entities: DeepPartial<E>[],
    into: ObjectType<E>,
  ): Promise<E[]> {
    return (
      await this.createQueryBuilder()
        .insert()
        .into(into)
        .values(entities as unknown as DeepPartial<Entity>[])
        .returning('*')
        .execute()
    ).generatedMaps as E[];
  }

  protected async insertEntityOne<E = Entity>(
    entities: DeepPartial<E>,
    into: ObjectType<E>,
  ): Promise<E> {
    return (
      await this.createQueryBuilder()
        .insert()
        .into(into)
        .values(entities as unknown as DeepPartial<Entity>)
        .returning('*')
        .execute()
    ).generatedMaps[0] as E;
  }
}
