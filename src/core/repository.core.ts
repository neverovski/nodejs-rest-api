/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DatabaseError } from 'pg';
import {
  QueryFailedError,
  Repository,
  ObjectLiteral,
  EntityTarget,
  SelectQueryBuilder,
  FindManyOptions,
} from 'typeorm';

import DB from '@db/index';
import { i18n } from '@i18n';
import { DB_UQ_USER_EMAIL, HttpException, PostgresErrorCode } from '@utils';
import { ResponseHelper } from '@utils/helpers';

export default class RepositoryCore<Entity extends Id & ObjectLiteral> {
  protected orm: Repository<Entity>;
  private messageNotFound = i18n().notFound.default;

  constructor(entity: EntityTarget<Entity>) {
    this.orm = DB.dataSource.getRepository(entity);
  }

  protected buildOrder(
    {
      order,
      alias,
    }: Pick<FindManyOptions<Entity>, 'order'> & { alias: string },
    queryBuilder: SelectQueryBuilder<Entity>,
  ) {
    if (order && Object.keys(order).length) {
      for (const key in order) {
        if ({}.hasOwnProperty.call(order, key)) {
          queryBuilder.addOrderBy(
            `${alias}.${key}`,
            order[key] as Order,
            'NULLS LAST',
          );
        }
      }
    } else {
      queryBuilder.addOrderBy(`${alias}.id`, 'DESC');
    }
  }

  protected errorHandler(error: unknown) {
    if (
      (error as Error)?.name === 'EntityNotFound' ||
      (error as Error)?.name === 'EntityNotFoundError'
    ) {
      return ResponseHelper.error(HttpException.NOT_FOUND, {
        message: this.messageNotFound,
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

  protected setMessageNotFound(message: string) {
    this.messageNotFound = message;
  }
}
