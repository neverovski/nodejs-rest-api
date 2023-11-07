import { LoggerCtx, SocialNetwork } from '@common/enums';
import { PlatformPayload } from '@common/types';
import { RequestUtil, UrlUtil } from '@common/utils';
import { IPlatformConfig, PlatformConfig } from '@config';
import { ProviderServiceCore } from '@core/service';

import { FACEBOOK_LINK } from './facebook.constant';
import { FacebookResponse } from './facebook.type';
import { IFacebookService } from './interface';

export class FacebookService
  extends ProviderServiceCore
  implements IFacebookService
{
  private readonly platformConfig: IPlatformConfig;

  constructor() {
    super(LoggerCtx.FACEBOOK);

    this.platformConfig = PlatformConfig;
  }

  async getPlatformPayload(token: string): Promise<PlatformPayload> {
    try {
      const url = UrlUtil.createUrl(this.platformConfig.facebook.url, {
        fields: this.platformConfig.facebook.fields,
        access_token: token,
      });

      const data = await RequestUtil.get<FacebookResponse>(url);

      return {
        ssid: data.id,
        name: SocialNetwork.FACEBOOK,
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
