import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { IPlatformRepository, IPlatformService } from './interface';
import { PlatformInject } from './platform.enum';
import { PlatformService } from './platform.service';
import { PlatformRepository } from './repository';

export class PlatformDi extends DiCore {
  register() {
    this.registerRepository();
    this.registerService();
  }

  private registerRepository() {
    Container.registerSingleton<IPlatformRepository>(
      PlatformInject.REPOSITORY,
      PlatformRepository,
    );
  }

  private registerService() {
    Container.register<IPlatformService>(
      PlatformInject.SERVICE,
      PlatformService,
    );
  }
}
