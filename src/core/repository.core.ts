import {
  Repository,
  FindConditions,
  DeepPartial,
  ObjectType,
  ObjectLiteral,
} from 'typeorm';

import { OptionCtx } from '@utils/index';

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
