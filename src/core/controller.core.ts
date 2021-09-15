import { plainToClass, ClassTransformOptions } from 'class-transformer';

import { responseError, HttpExceptionType } from '@utils/index';

import Logger from './logger';

export default class ControllerCore {
  init(): void {
    Logger.trace(`${this.constructor.name} initialized...`);
  }

  protected response<T, R>(
    transformTo: { new (): R },
    data: T[],
    params?: {
      options?: ClassTransformOptions;
      page?: Page;
    },
  ): ResponseData<R[]>;

  protected response<T, R>(
    transformTo: { new (): R },
    data: T,
    params?: {
      options?: ClassTransformOptions;
      page?: Page;
    },
  ): ResponseData<R>;

  protected response<T, R>(
    transformTo: { new (): R },
    data: T | T[],
    params?: {
      options?: ClassTransformOptions;
      page?: Page;
    },
  ): ResponseData<R | R[]> {
    if (!data) {
      throw responseError(HttpExceptionType.NOT_FOUND);
    }

    const dataDTO = plainToClass(transformTo, data, params?.options || {});
    const meta = params?.page ? this.pages(params.page) : null;

    return { data: dataDTO, ...(meta && { meta }) };
  }

  private pages(data: Page): Meta {
    const currentPage = data.page;
    const pages = data.limit > 0 ? Math.ceil(data.count / data.limit) || 1 : 1;
    const totalPages = pages || 1;

    return {
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      nextPage: currentPage >= totalPages ? totalPages : currentPage + 1,
      prevPage: currentPage <= totalPages ? currentPage - 1 : totalPages - 1,
      totalPages,
      totalItems: data.count,
    };
  }
}
