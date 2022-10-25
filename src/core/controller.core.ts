import { Response } from 'express';

import { HttpException, HttpStatus, TransformDTO } from '@utils';
import { CookieHelper, ExceptionHelper, MappingHelper } from '@utils/helpers';

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
      throw ExceptionHelper.getError(HttpException.NOT_FOUND);
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
