import { DatabaseError } from 'pg';
import {
  Repository,
  FindConditions,
  DeepPartial,
  ObjectType,
  ObjectLiteral,
  QueryFailedError,
} from 'typeorm';

import { OptionCtx, DB_UQ_USER_EMAIL, HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

export default class RepositoryCore<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  async deleteEntity(query: FindConditions<Entity>): Promise<void> {
    await this.delete(query);
  }

  async findEntity(ctx: OptionCtx<Entity> = {}): Promise<Entity[]> {
    return this.find(ctx);
  }

  async findEntityOneOrFail(ctx: OptionCtx<Entity> = {}): Promise<Entity> {
    return this.findOneOrFail(ctx);
  }

  async updateEntity(
    ctx: Required<Pick<OptionCtx<Entity>, 'where'>> &
      Omit<OptionCtx<Entity>, 'where'>,
    body: DeepPartial<Entity>,
  ): Promise<Entity> {
    try {
      const entityFromDB = await this.findOneOrFail(ctx);

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
          return ResponseHelper.error(HttpException.EMAIL_ALREADY_TAKEN);
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
