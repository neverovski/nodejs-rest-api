import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { Exception, HttpCode } from '@libs';
import {
  FACEBOOK_LINK,
  PlatformPayload,
  RequestUtil,
  SocialNetwork,
} from '@utils';

import { FacebookResponse } from './facebook.type';
import { IFacebookService } from './interface';

export default class FacebookService
  extends ServiceCore
  implements IFacebookService
{
  private readonly url: string;

  constructor() {
    super();

    this.url = `${PlatformConfig.facebook.url}?fields=${PlatformConfig.facebook.fields}&access_token=`;

    this.init();
  }

  async getProfile(token: string): Promise<PlatformPayload> {
    try {
      const { data } = await RequestUtil.get<FacebookResponse>(
        `${this.url}${token}`,
      );

      return {
        ssid: data.id,
        name: SocialNetwork.FACEBOOK,
        url: `${FACEBOOK_LINK}/${data.id}`,
        ...(data?.email && {
          email: data.email.toLowerCase(),
        }),
        profile: {
          firstName: data?.first_name || '',
          lastName: data?.last_name || '',
        },
      };
    } catch (err) {
      this.handleError(err);

      throw Exception.getError(HttpCode.EXTERNAL);
    }
  }
}
