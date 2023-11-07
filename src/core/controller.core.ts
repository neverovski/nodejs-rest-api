import type { Response } from 'express';

import {
  AUTH_REFRESH_LINK,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from '@common/constants';
import { PageDto, PageMetaDto } from '@common/dtos';
import { MappingParams } from '@common/types';
import { DateUtil, MappingUtil } from '@common/utils';

export class ControllerCore {
  // protected responseHttpOk() {
  //   return {
  //     code: CodeException.OK,
  //     message: i18n()['message.ok'],
  //     status: HttpStatus.OK,
  //   };
  // }

  protected mappingDataToDto<T extends Record<string, any>, V>(
    dataIn: V | V[],
    { cls, options, pageOption, itemCount }: Omit<MappingParams<T, V>, 'data'>,
  ) {
    let dataOut: V | V[] | T | T[] = dataIn;

    if (cls) {
      dataOut = MappingUtil.objToDto({
        cls,
        data: dataIn,
        options,
      });
    }

    if (pageOption) {
      const meta = new PageMetaDto({
        pageOption,
        itemCount: itemCount ?? 0,
      });

      return new PageDto(dataOut as T[], meta);
    }

    return dataOut;
  }

  protected storeTokenInCookie<T extends TokePayload>(
    res: Response,
    authToken: Partial<T>,
    options: CookieParam,
  ) {
    const maxAge = this.getCookieMaxAge(options);

    res.cookie(COOKIE_ACCESS_TOKEN, authToken?.accessToken, {
      domain: options?.domain || '',
      secure: true,
      sameSite: 'lax',
      path: '/',
      ...maxAge,
    });

    res.cookie(COOKIE_REFRESH_TOKEN, authToken?.refreshToken, {
      domain: options?.domain || '',
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
      path: AUTH_REFRESH_LINK,
      ...maxAge,
    });
  }

  private getCookieMaxAge(options: CookieParam) {
    const maxAge = DateUtil.toMs(options?.expiresIn);

    if (options?.maxAge || options?.rememberMe) {
      return { maxAge: options.maxAge ?? maxAge };
    }

    return {};
  }
}
