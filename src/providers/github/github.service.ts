import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { Exception, HttpCode } from '@libs';
import { PlatformPayload, RequestUtil, SocialNetwork } from '@utils';

import { GitHubResponse } from './github.type';
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

  async getProfile(token: string): Promise<PlatformPayload> {
    try {
      const config = {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${token}`,
        },
      };

      const { data } = await RequestUtil.get<GitHubResponse>(this.url, config);

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
