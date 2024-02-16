import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey, PlatformName } from '@common/enums';
import { PlatformPayload } from '@common/types';
import { RequestUtil, UrlUtil } from '@common/utils';
import { IPlatformConfig } from '@config';
import { ProviderServiceCore } from '@core/service';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { FACEBOOK_LINK } from './facebook.constant';
import { FacebookResponse } from './facebook.type';
import { IFacebookService } from './interface';

@Singleton()
export class FacebookService
  extends ProviderServiceCore
  implements IFacebookService
{
  constructor(
    @Inject(ConfigKey.PLATFORM)
    private readonly platformConfig: IPlatformConfig,
    @Inject(LoggerInject.SERVICE) protected readonly logger: ILoggerService,
  ) {
    super();
  }

  async getPayload(token: string): Promise<PlatformPayload> {
    try {
      const url = UrlUtil.createUrl(this.platformConfig.facebook.url, {
        fields: this.platformConfig.facebook.fields,
        access_token: token,
      });

      const data = await RequestUtil.get<FacebookResponse>(url);

      return {
        ssid: data.id,
        name: PlatformName.FACEBOOK,
        url: `${FACEBOOK_LINK}/${data.id}`,
        ...(data?.email && {
          email: data.email.toLowerCase(),
        }),
        profile: {
          lastName: data?.last_name || '',
          firstName: data?.first_name || '',
        },
      };
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
