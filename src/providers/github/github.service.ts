import { LoggerCtx, SocialNetwork } from '@common/enums';
import { PlatformPayload } from '@common/types';
import { RequestUtil } from '@common/utils';
import { IPlatformConfig, PlatformConfig } from '@config';
import { ProviderServiceCore } from '@core/service';

import { GitHubResponse } from './github.type';
import { IGitHubService } from './interface';

export class GitHubService
  extends ProviderServiceCore
  implements IGitHubService
{
  private readonly platformConfig: IPlatformConfig;

  constructor() {
    super(LoggerCtx.GITHUB);

    this.platformConfig = PlatformConfig;
  }

  async getPlatformPayload(token: string): Promise<PlatformPayload> {
    try {
      const config = this.getConfig(token);

      const data = await RequestUtil.get<GitHubResponse>(
        this.platformConfig.github.url,
        config,
      );

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
      throw this.handleError(err);
    }
  }

  private getConfig(token: string) {
    return {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${token}`,
      },
    };
  }
}
