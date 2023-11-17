import { container } from 'tsyringe';

import { CacheManagerInject } from './cache-manager.enum';
import { CacheManagerService } from './cache-manager.service';
import { ICacheManagerService } from './interface';

export class CacheManagerDi {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<ICacheManagerService>(
      CacheManagerInject.SERVICE,
      new CacheManagerService(),
    );
  }
}
