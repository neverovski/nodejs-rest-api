import axios from 'axios';

import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { Exception, HttpCode } from '@lib';
import { PlatformProvider } from '@modules/platform';
import { SocialNetwork } from '@utils';

import { GitHubProfile } from './github.type';
import { IGitHubService } from './interface';

export default class GitHubService
  extends ServiceCore
  implements IGitHubService
{
  private readonly url: string;

  constructor() {
    super();

    this.url = PlatformConfig.github.url;

    this.init();
  }

  async getProfile(token: string): Promise<PlatformProvider> {
    try {
      const { data } = await axios.get<GitHubProfile>(this.url, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${token}`,
        },
      });

      return {
        ssid: data.id,
        name: SocialNetwork.GITHUB,
        url: data.html_url || '',
        ...(data?.email && {
          email: data.email.toLowerCase(),
        }),
        ...(data?.name && {
          profile: {
            firstName: data.name,
          },
        }),
      };
    } catch (err) {
      this.handleError(err);

      throw Exception.getError(HttpCode.EXTERNAL);
    }
  }
}
