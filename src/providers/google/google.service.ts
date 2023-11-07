import { TokenPayload } from 'google-auth-library';

import { LoggerCtx, SocialNetwork } from '@common/enums';
import { PlatformPayload } from '@common/types';
import { RequestUtil, UrlUtil } from '@common/utils';
import { IPlatformConfig, PlatformConfig } from '@config';
import { ProviderServiceCore } from '@core/service';
import { i18n } from '@i18n';

import { IGoogleService } from './interface';

export class GoogleService
  extends ProviderServiceCore
  implements IGoogleService
{
  private readonly platformConfig: IPlatformConfig;

  constructor() {
    super(LoggerCtx.GOOGLE);

    this.platformConfig = PlatformConfig;
  }

  async getPlatformPayload(token: string): Promise<PlatformPayload> {
    const tokenPayload = await this.getTokenPayload(token);

    if (!tokenPayload) {
      throw this.handleError({ message: i18n()['notFound.default'] });
    }

    return {
      ssid: tokenPayload.sub,
      name: SocialNetwork.GOOGLE,
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
