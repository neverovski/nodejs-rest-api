import axios from 'axios';
import { singleton } from 'tsyringe';

import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { PlatformProvider } from '@modules/platform';
import { FACEBOOK_LINK, HttpException, SocialNetwork } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { FacebookProfile } from './facebook.type';
import { IFacebookService } from './interface';

@singleton()
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

      throw ResponseHelper.error(HttpException.TOKEN_VERIFY);
    }
  }
}
