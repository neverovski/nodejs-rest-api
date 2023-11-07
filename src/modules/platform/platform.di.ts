import { container } from 'tsyringe';

import { IPlatformRepository, IPlatformService } from './interface';
import PlatformService from './platform.service';
import { PlatformInject } from './platform.type';
import PlatformRepository from './repository/platform.repository';

container.registerSingleton<IPlatformRepository>(
  PlatformInject.PLATFORM_REPOSITORY,
  PlatformRepository,
);

container.register<IPlatformService>(
  PlatformInject.PLATFORM_SERVICE,
  PlatformService,
);

export class AppleDependencies {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<IAppleService>(
      AppleInject.SERVICE,
      container.resolve(AppleService),
    );
  }
}
