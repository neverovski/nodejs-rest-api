import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey, PlatformName } from '@common/enums';
import { PlatformPayload } from '@common/types';
import { RequestUtil } from '@common/utils';
import { IPlatformConfig } from '@config';
import { ProviderServiceCore } from '@core/service';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { GitHubResponse } from './github.type';
import { IGitHubService } from './interface';

@Singleton()
export class GitHubService
  extends ProviderServiceCore
  implements IGitHubService
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
      const config = this.getConfig(token);

      const data = await RequestUtil.get<GitHubResponse>(
        this.platformConfig.github.url,
        config,
      );

      return {
        ssid: data.id,
        name: PlatformName.GITHUB,
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
