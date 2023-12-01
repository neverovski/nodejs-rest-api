import Bull, { QueueOptions } from 'bull';

import { DEFAULT_JOB_OPTIONS, DEFAULT_LIMITER } from '@common/constants';
import { IRedisConfig } from '@config';

export class QueueUtil {
  static connect<T>(name: string, redisConfig: IRedisConfig) {
    return new Bull<T>(name, {
      redis: this.getRedisOptions(redisConfig),
      prefix: redisConfig.queuePrefix,
      limiter: DEFAULT_LIMITER,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    });
  }

  private static getRedisOptions(
    redisConfig: IRedisConfig,
  ): QueueOptions['redis'] {
    return {
      host: redisConfig.host,
      port: redisConfig.port,
      ...(redisConfig.username && { username: redisConfig.username }),
      ...(redisConfig.username && { password: redisConfig.password }),
      ...(redisConfig.tls && {
        tls: {},
        connectTimeout: 30000,
      }),
    };
  }
}
