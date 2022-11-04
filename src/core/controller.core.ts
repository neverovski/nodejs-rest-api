import { Response } from 'express';

import { CookieHelper, MappingHelper } from '@helpers';
import { Exception, HttpCode, HttpStatus } from '@lib';
import { TransformDTO } from '@utils';

export default class ControllerCore {
  protected deleteCookie<T extends object>(res: Response, cookies: T) {
    CookieHelper.deleteMany(res, cookies);
  }

  protected response<T, DTO>(
    res: Response,
    ctx?: TransformDTO<T, DTO> & { status?: HttpStatus },
  ) {
    const { data, options, dto } = ctx || {};

    if (!data && ctx?.status === HttpStatus.OK) {
      throw Exception.getError(HttpCode.NOT_FOUND);
    }

    const status = !ctx ? HttpStatus.NoContent : ctx?.status || HttpStatus.OK;

    res.status(status).json({
      ...(data && {
        data: dto ? MappingHelper.toDTO({ dto, data, options }) : data,
      }),
    });
  }

  protected setCookie<T>(res: Response, data: T) {
    CookieHelper.setMany(res, data, { httpOnly: true });
  }
}
