import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { PlatformName } from '@common/enums';
import { NotFoundException } from '@common/exceptions';
import { i18n } from '@i18n';
import { AppleInject, IAppleService } from '@providers/apple';
import { FacebookInject, IFacebookService } from '@providers/facebook';
import { GitHubInject, IGitHubService } from '@providers/github';
import { GoogleInject, IGoogleService } from '@providers/google';

import { IPlatformRepository, IPlatformService } from './interface';
import { PlatformInject } from './platform.enum';
import { CreatePlatform } from './platform.type';

@Injectable()
export class PlatformService implements IPlatformService {
  constructor(
    @Inject(AppleInject.SERVICE) private readonly appleService: IAppleService,
    @Inject(FacebookInject.SERVICE)
    private readonly facebookService: IFacebookService,
    @Inject(GitHubInject.SERVICE)
    private readonly gitHubService: IGitHubService,
    @Inject(GoogleInject.SERVICE)
    private readonly googleService: IGoogleService,
    @Inject(PlatformInject.REPOSITORY)
    private readonly repository: IPlatformRepository,
  ) {}

  async create(data: CreatePlatform) {
    const payload = await this.getPayload(data);
    const platform = await this.repository.findOne({
      where: { name: payload.name, ssid: payload.ssid },
    });

    if (platform?.user) {
      return platform.user;
    }

    return this.repository.createByPayload(payload);
  }

  private getPayload({ platform, token }: CreatePlatform) {
    switch (platform) {
      case PlatformName.FACEBOOK:
        return this.facebookService.getPayload(token);
      case PlatformName.APPLE:
        return this.appleService.getPayload(token);
      case PlatformName.GOOGLE:
        return this.googleService.getPayload(token);
      case PlatformName.GITHUB:
        return this.gitHubService.getPayload(token);
      default:
        throw new NotFoundException(i18n()['notFound.platform']);
    }
  }
}
