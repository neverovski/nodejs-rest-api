import type { Response } from 'express';

import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '@common/constants';
import { PageDto, PageMetaDto } from '@common/dtos';
import { TransformCtx } from '@common/types';
import { DateUtil, MappingUtil } from '@common/utils';

export class ControllerCore {
  // protected responseHttpOk() {
  //   return {
  //     code: CodeException.OK,
  //     message: i18n()['message.ok'],
  //     status: HttpStatus.OK,
  //   };
  // }

  protected storeTokenInCookie<T extends TokePayload>(
    res: Response,
    authToken: Partial<T>,
    options: CookieParam,
  ) {
    const maxAge = DateUtil.toMs(options?.expiresIn || '1s');

    res.cookie(COOKIE_ACCESS_TOKEN, authToken?.accessToken, {
      domain: options?.domain || '',
      secure: true,
      sameSite: 'strict',
      maxAge: options?.maxAge ?? maxAge,
      path: '/',
    });

    //TODO: only api/v1/refresh
    res.cookie(COOKIE_REFRESH_TOKEN, authToken?.refreshToken, {
      domain: options?.domain || '',
      secure: true,
      sameSite: 'strict',
      maxAge: options?.maxAge ?? maxAge,
      httpOnly: true,
      path: '/',
    });
  }

  protected transformDataToDto<T, C>(
    dataIn: T | T[],
    { dataClass, transformOptions, pagination, itemCount }: TransformCtx<T, C>,
  ) {
    const dataOut = MappingUtil.toDto({
      cls: dataClass,
      data: dataIn,
      options: transformOptions,
    });

    if (pagination) {
      const meta = new PageMetaDto({
        pageOption: pagination,
        itemCount: itemCount ?? 0,
      });

      return new PageDto(dataOut as T[], meta);
    }

    return dataOut;
  }
}
