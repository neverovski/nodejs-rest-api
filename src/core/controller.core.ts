import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { HttpException, HttpStatus } from '@utils';
import { CookieHelper, ResponseHelper } from '@utils/helpers';

export default class ControllerCore {
  protected deleteCookie<T extends object>(res: Response, cookies: T) {
    CookieHelper.deleteMany(res, cookies);
  }

  protected response<T, DTO>(
    res: Response,
    ctx?: {
      data: T | T[];
      dto?: { new (): DTO };
      options?: ClassTransformOptions;
      // page?: Page | null;
      status?: HttpStatus;
    },
  ) {
    const { data, options, dto } = ctx || {};

    if (!data && ctx?.status === HttpStatus.OK) {
      throw ResponseHelper.error(HttpException.NOT_FOUND);
    }

    const status = !ctx ? HttpStatus.NoContent : ctx?.status || HttpStatus.OK;

    res.status(status).json({
      ...(data && { data: dto ? plainToInstance(dto, data, options) : data }),
      // ...(page && { meta: this.pages(page) }),
    });
  }

  protected setCookie<T>(res: Response, data: T) {
    CookieHelper.setMany(res, data, { httpOnly: true });
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
