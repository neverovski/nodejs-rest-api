import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { CacheManagerInject } from './cache-manager.enum';
import { CacheManagerService } from './cache-manager.service';
import { ICacheManagerService } from './interface';

export class CacheManagerDi extends DiCore {
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
