import { container as Container } from 'tsyringe';

import { CacheManagerInject } from './cache-manager.enum';
import { CacheManagerService } from './cache-manager.service';
import { ICacheManagerService } from './interface';

export class CacheManagerDi {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.registerSingleton<ICacheManagerService>(
      CacheManagerInject.SERVICE,
      CacheManagerService,
    );
  }
}
