import { inject, injectable } from 'tsyringe';

import { Exception, HttpCode, i18n } from '@libs';
import { AppleInject, IAppleService } from '@providers/apple';
import { FacebookInject, IFacebookService } from '@providers/facebook';
import { GitHubInject, IGitHubService } from '@providers/github';
import { GoogleInject, IGoogleService } from '@providers/google';
import { SocialNetwork } from '@utils';

import { IPlatformRepository, IPlatformService } from './interface';
import { PlatformInject, PlatformRequest } from './platform.type';

@injectable()
export default class PlatformService implements IPlatformService {
  constructor(
    @inject(FacebookInject.FACEBOOK_SERVICE)
    private readonly facebookService: IFacebookService,
    @inject(PlatformInject.PLATFORM_REPOSITORY)
    private readonly repository: IPlatformRepository,
    @inject(AppleInject.APPLE_SERVICE)
    private readonly appleService: IAppleService,
    @inject(GoogleInject.GOOGLE_SERVICE)
    private readonly googleService: IGoogleService,
    @inject(GitHubInject.GITHUB_SERVICE)
    private readonly gitHubService: IGitHubService,
  ) {}

  async create(body: PlatformRequest) {
    const profile = await this.getProfile(body);
    const platform = await this.repository.findOne({
      where: { name: profile.name, ssid: profile.ssid },
    });

    if (platform?.userId) {
      return { userId: platform.userId };
    }

    return this.repository.create(profile);
  }

  private getProfile({ platform, token }: PlatformRequest) {
    switch (platform) {
      case SocialNetwork.FACEBOOK:
        return this.facebookService.getProfile(token);
      case SocialNetwork.APPLE:
        return this.appleService.getProfile(token);
      case SocialNetwork.GOOGLE:
        return this.googleService.getProfile(token);
      case SocialNetwork.GITHUB:
        return this.gitHubService.getProfile(token);
      default:
        throw Exception.getError(HttpCode.NOT_FOUND, {
          message: i18n()['notFound.platform'],
        });
    }
  }
}
