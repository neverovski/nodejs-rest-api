/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DatabaseError } from 'pg';
import {
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  ObjectLiteral,
  QueryFailedError,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import DB from '@db/index';
import { i18n } from '@lib';
import { DB_UQ_USER_EMAIL, HttpException, PostgresErrorCode } from '@utils';
import { ResponseHelper } from '@utils/helpers';

export default class RepositoryCore<Entity extends Id & ObjectLiteral> {
  protected readonly alias: string;
  protected orm: Repository<Entity>;
  private readonly notFound: string;

  constructor(entity: EntityTarget<Entity>, alias?: string) {
    this.orm = DB.dataSource.getRepository(entity);
    this.alias = alias || 'entity';
    this.notFound = (i18n()[`notFound.${this.alias}`] ||
      i18n()['notFound.default']) as string;
  }

  async create(body: Entity): Promise<Id> {
    try {
      const entity = this.orm.create(body);

      await this.orm.save(entity);

      return { id: entity.id };
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async delete(query: Partial<Entity>): Promise<void> {
    try {
      await this.orm.delete(query);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOne(options: FindManyOptions<Entity>): Promise<Entity | null> {
    try {
      return await this.orm.findOne(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOneOrFail(options: FindManyOptions<Entity>): Promise<Entity> {
    try {
      return await this.orm.findOneOrFail(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async update(entity: Entity, body: DeepPartial<Entity>): Promise<void> {
    try {
      this.orm.merge(entity, body);
      await this.orm.save(entity);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  protected buildOrder(
    { order }: Pick<FindManyOptions<Entity>, 'order'>,
    queryBuilder: SelectQueryBuilder<Entity>,
  ) {
    if (order && Object.keys(order).length) {
      for (const key in order) {
        if ({}.hasOwnProperty.call(order, key)) {
          queryBuilder.addOrderBy(
            `${this.alias}.${key}`,
            order[key] as Order,
            'NULLS LAST',
          );
        }
      }
    } else {
      queryBuilder.addOrderBy(`${this.alias}.id`, 'DESC');
    }
  }

  protected handleError(error: unknown) {
    if (
      (error as Error)?.name === 'EntityNotFound' ||
      (error as Error)?.name === 'EntityNotFoundError'
    ) {
      return ResponseHelper.error(HttpException.NOT_FOUND, {
        message: this.notFound,
      });
    }

    if (error instanceof QueryFailedError) {
      const err = error.driverError as DatabaseError;

      if (err.code === PostgresErrorCode.UniqueViolation) {
        switch (err.constraint) {
          case DB_UQ_USER_EMAIL:
            return ResponseHelper.error(HttpException.EMAIL_ALREADY_TAKEN);
          default:
            return error;
        }
      }
    }

    return error;
  }
}
