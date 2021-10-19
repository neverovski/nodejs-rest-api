import AutoBind from 'auto-bind';
import { plainToClass, ClassTransformOptions } from 'class-transformer';
import { Response } from 'express';

import { codeError, HttpExceptionType, HttpStatus } from '@utils/index';

import Logger from './logger';

export default class ControllerCore {
  constructor() {
    this.init();

    AutoBind(this);
  }

  response<T, DTO>(
    res: Response,
    ctx?: {
      data: T | T[];
      dto?: { new (): DTO };
      status?: HttpStatus;
      // page?: Page | null;
      options?: ClassTransformOptions;
    },
  ) {
    const { data, options, dto } = ctx || {};

    if (!data && ctx?.status === HttpStatus.OK) {
      throw codeError(HttpExceptionType.NOT_FOUND);
    }

    const status = !ctx ? HttpStatus.NoContent : ctx?.status || HttpStatus.OK;

    res.status(status).json({
      ...(data && { data: dto ? plainToClass(dto, data, options) : data }),
      // ...(page && { meta: this.pages(page) }),
    });
  }

  private init(): void {
    Logger.trace(`${this.constructor.name} initialized...`);
  }

  // private pages(data: Page): Meta {
  //   const currentPage = data.page;
  //   const pages = data.limit > 0 ? Math.ceil(data.count / data.limit) || 1 : 1;
  //   const totalPages = pages || 1;

  //   return {
  //     limit: data.limit,
  //     currentPage,
  //     hasNextPage: currentPage < totalPages,
  //     hasPrevPage: currentPage > 1,
  //     nextPage: currentPage >= totalPages ? totalPages : currentPage + 1,
  //     prevPage: currentPage <= totalPages ? currentPage - 1 : totalPages - 1,
  //     totalPages,
  //     totalItems: data.count,
  //   };
  // }
}
