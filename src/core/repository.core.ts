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
} from '@utils/index';

export default class RepositoryCore<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  async deleteEntity(query: FindConditions<Entity>): Promise<void> {
    await this.delete(query);
  }

  findEntityList(options: OptionCtx<Entity> = {}): Promise<Entity[]> {
    return this.find(options);
  }

  findEntityOneOrFail(options: OptionCtx<Entity> = {}): Promise<Entity> {
    return this.findOneOrFail(options);
  }

  protected errorHandler(error: unknown) {
    if (error instanceof QueryFailedError) {
      const err = error.driverError as DatabaseError;

      if (err.code === '23505' && err.constraint === DB_UQ_USER_EMAIL) {
        return ResponseHelper.error(HttpExceptionType.EMAIL_ALREADY_TAKEN);
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
        .values(entities)
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
        .values(entities)
        .returning('*')
        .execute()
    ).generatedMaps[0] as E;
  }
}
