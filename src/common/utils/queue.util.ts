import Bull, { QueueOptions } from 'bull';

import { DEFAULT_JOB_OPTIONS, DEFAULT_LIMITER } from '@common/constants';
import { RedisConfig } from '@config';

export class QueueUtil {
  private static get redisOptions(): QueueOptions['redis'] {
    return {
      host: RedisConfig.host,
      port: RedisConfig.port,
      ...(RedisConfig.username && { username: RedisConfig.username }),
      ...(RedisConfig.username && { password: RedisConfig.password }),
      ...(RedisConfig.tls && {
        tls: {},
        connectTimeout: 30000,
      }),
    };
  }

  static connect<T>(name: string) {
    return new Bull<T>(name, {
      redis: this.redisOptions,
      prefix: RedisConfig.queuePrefix,
      limiter: DEFAULT_LIMITER,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    });
  }
}
