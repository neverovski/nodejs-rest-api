import type { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';

import { IRedisConfig } from '@config';

export const redisConnect = (
  redisConfig: IRedisConfig,
  cacheTime?: number,
): BaseDataSourceOptions['cache'] => ({
  type: 'ioredis',
  options: {
    host: redisConfig.host,
    port: redisConfig.port,
    ...(redisConfig.username && { username: redisConfig.username }),
    ...(redisConfig.password && { password: redisConfig.password }),
    ...(redisConfig.tls && {
      tls: {},
      connectTimeout: 30000,
    }),
  },
  alwaysEnabled: true,
  duration: cacheTime,
  ignoreErrors: true,
});

export const redisClusterConnect = (
  redisConfig: IRedisConfig,
  cacheTime?: number,
): BaseDataSourceOptions['cache'] => ({
  type: 'ioredis/cluster',
  options: {
    startupNodes: [
      {
        host: redisConfig.host,
        port: redisConfig.port,
        ...(redisConfig.username && { username: redisConfig.username }),
        ...(redisConfig.password && { password: redisConfig.password }),
      },
    ],
    options: {
      ...(redisConfig.tls && {
        tls: {},
        connectTimeout: 30000,
      }),
      scaleReads: 'all',
      clusterRetryStrategy: function () {
        return null;
      },
      redisOptions: {
        maxRetriesPerRequest: 1,
      },
    },
  },
  alwaysEnabled: true,
  duration: cacheTime,
  ignoreErrors: true,
});
