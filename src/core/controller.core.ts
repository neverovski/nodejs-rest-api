import type { Response as ExpressResponse } from 'express';

import {
  AUTH_REFRESH_LINK,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from '@common/constants';
import { PageDto, PageMetaDto } from '@common/dtos';
import { HttpStatus, MessageCode } from '@common/enums';
import { Exception, MappingParams } from '@common/types';
import { DateUtil, MappingUtil } from '@common/utils';
import { IAppConfig, IJwtConfig } from '@config';
import { i18n } from '@i18n';

export class ControllerCore {
  protected readonly appConfig!: IAppConfig;
  protected readonly jwtConfig!: IJwtConfig;

  protected getOk(message?: string): Exception {
    return {
      message: message || i18n()['message.ok'],
      messageCode: MessageCode.OK,
      statusCode: HttpStatus.OK,
    };
  }

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
    res: ExpressResponse,
    authToken: Partial<T>,
    options?: Partial<CookieParam>,
  ) {
    const params = this.getCookieParam(options);
    const maxAge = this.getCookieMaxAge(params);

    res.cookie(COOKIE_ACCESS_TOKEN, authToken?.accessToken, {
      domain: params?.domain || '',
      secure: true,
      sameSite: 'lax',
      path: '/',
      ...maxAge,
    });

    res.cookie(COOKIE_REFRESH_TOKEN, authToken?.refreshToken, {
      domain: params?.domain || '',
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
      path: AUTH_REFRESH_LINK,
      ...maxAge,
    });
  }

  private getCookieMaxAge(options: Partial<CookieParam>) {
    const maxAge = DateUtil.parseStringToMs(options?.expiresIn || '');

    if (options?.maxAge || options?.rememberMe) {
      return { maxAge: options.maxAge ?? maxAge };
    }

    return {};
  }

  private getCookieParam(options?: Partial<CookieParam>): Partial<CookieParam> {
    return {
      expiresIn: this.jwtConfig.refreshToken.expiresIn,
      domain: this.appConfig.domain,
      ...options,
    };
  }
}
