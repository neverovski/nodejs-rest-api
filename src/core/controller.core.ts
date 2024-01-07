import type {
  ClassConstructor,
  ClassTransformOptions,
} from 'class-transformer';
import type { Response as ExpressResponse } from 'express';

import {
  AUTH_REFRESH_LINK,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from '@common/constants';
import { PageDto, PageMetaDto, PageOptionDto } from '@common/dtos';
import { HttpStatus, MessageCode } from '@common/enums';
import { Exception, MappingParams, ResponseCtx } from '@common/types';
import { DateUtil, MappingUtil } from '@common/utils';
import { IAppConfig, IJwtConfig } from '@config';
import { i18n } from '@i18n';

export class ControllerCore {
  protected readonly appConfig!: IAppConfig;
  protected readonly jwtConfig!: IJwtConfig;

  protected getMessage(message?: string): Exception {
    return {
      message: this.getDefaultMessage(message),
      messageCode: MessageCode.OK,
      statusCode: HttpStatus.OK,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected mappingDataToDto<T extends Record<string, any>, V>(
    dataIn: V | V[],
    { cls, options, pageOption, itemCount }: Omit<MappingParams<T, V>, 'data'>,
  ) {
    const dataOut = this.mapToDtoIfClassProvided(dataIn, cls, options);

    if (pageOption) {
      return this.createPageDto(dataOut, pageOption, itemCount);
    }

    return dataOut;
  }

  protected sendJson<T>(res: ExpressResponse, data?: T, ctx?: ResponseCtx) {
    res.status(ctx?.status || HttpStatus.OK).json(data ? { data } : null);
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

  private checkConfig() {
    if (!this.appConfig || !this.jwtConfig) {
      throw new Error('Missing appConfig or jwtConfig');
    }
  }

  private createPageDto<T extends Record<string, unknown>>(
    data: T | T[],
    pageOption: PageOptionDto,
    itemCount?: number,
  ): PageDto<T> {
    const meta = new PageMetaDto({
      pageOption,
      itemCount: itemCount ?? 0,
    });

    return new PageDto(data as T[], meta);
  }

  private getCookieMaxAge(options: Partial<CookieParam>) {
    const maxAge = DateUtil.parseStringToMs(options?.expiresIn || '');

    if (options?.maxAge || options?.rememberMe) {
      return { maxAge: options.maxAge ?? maxAge };
    }

    return {};
  }

  private getCookieParam(options?: Partial<CookieParam>): Partial<CookieParam> {
    this.checkConfig();

    return {
      expiresIn: this.jwtConfig.refreshToken.expiresIn,
      domain: this.appConfig.domain,
      ...options,
    };
  }

  private getDefaultMessage(message?: string): string {
    return message || i18n()['message.ok'];
  }

  private mapToDtoIfClassProvided<V, T extends Record<string, unknown>>(
    dataIn: V | V[],
    cls?: ClassConstructor<T>,
    options?: ClassTransformOptions,
  ): T | T[] {
    if (cls) {
      return MappingUtil.objToDto({
        cls,
        data: dataIn,
        options,
      });
    }

    return dataIn as T | T[];
  }
}
