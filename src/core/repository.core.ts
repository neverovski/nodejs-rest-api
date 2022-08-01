/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DatabaseError } from 'pg';
import {
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
  private _notFound: string;

  constructor(entity: EntityTarget<Entity>, alias?: string) {
    this.orm = DB.dataSource.getRepository(entity);
    this.alias = alias || 'entity';
    this._notFound = i18n()['notFound.default'];
  }

  set notFound(message: string) {
    this._notFound = message;
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
        message: this._notFound,
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
