import { injectable, inject } from 'tsyringe';

import { i18n } from '@lib';
import { IAppleService, AppleInject } from '@providers/apple';
import { IFacebookService, FacebookInject } from '@providers/facebook';
import { IGoogleService, GoogleInject } from '@providers/google';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { IPlatformService, IPlatformRepository } from './interface';
import {
  PlatformRequest,
  PlatformNetwork,
  PlatformInject,
} from './platform.type';

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
  ) {}

  async create(body: PlatformRequest) {
    const profile = await this.getProfile(body);

    return this.repository.create(profile);
  }

  private getProfile({ platform, token }: PlatformRequest) {
    switch (platform) {
      case PlatformNetwork.FACEBOOK:
        return this.facebookService.getProfile(token);
      case PlatformNetwork.APPLE:
        return this.appleService.getProfile(token);
      case PlatformNetwork.GOOGLE:
        return this.googleService.getProfile(token);
      default:
        throw ResponseHelper.error(HttpException.NOT_FOUND, {
          message: i18n()['notFound.platform'],
        });
    }
  }
}
