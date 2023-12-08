import Bull, { QueueOptions } from 'bull';

import { DEFAULT_JOB_OPTIONS, DEFAULT_LIMITER } from '@common/constants';
import { IRedisConfig } from '@config';

export class QueueUtil {
  static connect<T>(name: string, redisConfig: IRedisConfig) {
    if (!name) throw new Error('name is required');
    if (!redisConfig.host) throw new Error('redisConfig.host is required');
    if (!redisConfig.port) throw new Error('redisConfig.port is required');

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
      ...(redisConfig.password && { password: redisConfig.password }),
      ...(redisConfig.tls && {
        tls: {},
        connectTimeout: 30000,
      }),
    };
  }
}
