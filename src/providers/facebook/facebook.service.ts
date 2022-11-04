import axios from 'axios';

import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { Exception, HttpCode } from '@lib';
import { PlatformProvider } from '@modules/platform';
import { FACEBOOK_LINK, SocialNetwork } from '@utils';

import { FacebookProfile } from './facebook.type';
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

  async getProfile(token: string): Promise<PlatformProvider> {
    try {
      const { data } = await axios.get<FacebookProfile>(`${this.url}${token}`);

      return {
        ssid: data.id,
        name: SocialNetwork.FACEBOOK,
        url: `${FACEBOOK_LINK}/${data.id}`,
        ...(data?.email && {
          email: data.email.toLowerCase(),
        }),
        ...((data?.first_name || data?.last_name) && {
          profile: {
            firstName: data?.first_name || '',
            lastName: data?.last_name || '',
          },
        }),
      };
    } catch (err) {
      this.handleError(err);

      throw Exception.getError(HttpCode.EXTERNAL);
    }
  }
}
