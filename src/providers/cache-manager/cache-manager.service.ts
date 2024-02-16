import { ProviderServiceCore } from '@core/service';

import { ICacheManagerService } from './interface';

export class CacheManagerService
  extends ProviderServiceCore
  implements ICacheManagerService
{
  async clearByPattern(key: string) {
    const items = await this.getKeysByPattern(key);

    for (const item of items) {
      void this.del(item);
    }
  }

  //TODO:
  async del(key: string) {
    try {
      // await this.cache.del(key);
      await Promise.resolve(key);
    } catch (err) {
      this.handleError(err);
    }
  }

  //TODO:
  async get(key?: string) {
    try {
      if (!key) {
        return null;
      }

      // const data = await this.cache.get<T>(key);

      return await Promise.resolve(null);
    } catch (err) {
      this.handleError(err);

      return null;
    }
  }

  //TODO:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getKeysByPattern(_key: string): Promise<string[]> {
    // return this.cache.store.keys(`${key}*`);
    return Promise.resolve([]);
  }

  //TODO:
  async set<T>(key: string, data: T, ttl = 0) {
    try {
      // await this.cache.set(key, data, ttl);

      await Promise.resolve({ key, data, ttl });
    } catch (err) {
      this.handleError(err);
    }
  }
}
