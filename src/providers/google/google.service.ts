import { TokenPayload } from 'google-auth-library';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey, PlatformName } from '@common/enums';
import { PlatformPayload } from '@common/types';
import { RequestUtil, UrlUtil } from '@common/utils';
import { IPlatformConfig } from '@config';
import { ProviderServiceCore } from '@core/service';
import { i18n } from '@i18n';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { IGoogleService } from './interface';

@Singleton()
export class GoogleService
  extends ProviderServiceCore
  implements IGoogleService
{
  constructor(
    @Inject(ConfigKey.PLATFORM)
    private readonly platformConfig: IPlatformConfig,
    @Inject(LoggerInject.SERVICE) protected readonly logger: ILoggerService,
  ) {
    super();
  }

  async getPayload(token: string): Promise<PlatformPayload> {
    const tokenPayload = await this.getTokenPayload(token);

    if (!tokenPayload) {
      throw this.handleError({ message: i18n()['notFound.default'] });
    }

    return {
      ssid: tokenPayload.sub,
      name: PlatformName.GOOGLE,
      ...(tokenPayload?.email && {
        email: tokenPayload.email.toLowerCase(),
      }),
      ...((tokenPayload?.given_name || tokenPayload?.family_name) && {
        profile: {
          firstName: tokenPayload?.given_name || '',
          lastName: tokenPayload?.family_name || '',
        },
      }),
    };
  }

  private async getTokenPayload(token: string) {
    try {
      const url = UrlUtil.createUrl(this.platformConfig.google.url, {
        access_token: token,
      });

      return await RequestUtil.get<TokenPayload>(url);
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
