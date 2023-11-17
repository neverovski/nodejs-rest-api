import { container } from 'tsyringe';

import { IPlatformRepository, IPlatformService } from './interface';
import { PlatformInject } from './platform.enum';
import { PlatformService } from './platform.service';
import { PlatformRepository } from './repository';

export class PlatformDi {
  static init() {
    this.registerRepository();
    this.registerService();
  }

  private static registerRepository() {
    container.registerInstance<IPlatformRepository>(
      PlatformInject.REPOSITORY,
      container.resolve(PlatformRepository),
    );
  }

  private static registerService() {
    container.registerInstance<IPlatformService>(
      PlatformInject.SERVICE,
      container.resolve(PlatformService),
    );
  }
}
