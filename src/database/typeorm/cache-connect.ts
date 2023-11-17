import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';

import { DatabaseConfig, RedisConfig } from '@config';

export const redisConnect = (): BaseDataSourceOptions['cache'] => ({
  type: 'ioredis',
  options: {
    host: RedisConfig.host,
    port: RedisConfig.port,
    ...(RedisConfig.username && { username: RedisConfig.username }),
    ...(RedisConfig.password && { password: RedisConfig.password }),
    ...(RedisConfig.tls && {
      tls: {},
      connectTimeout: 30000,
    }),
  },
  alwaysEnabled: true,
  duration: DatabaseConfig.cacheTime,
  ignoreErrors: true,
});

export const redisClusterConnect = (): BaseDataSourceOptions['cache'] => ({
  type: 'ioredis/cluster',
  options: {
    startupNodes: [
      {
        host: RedisConfig.host,
        port: RedisConfig.port,
        ...(RedisConfig.username && { username: RedisConfig.username }),
        ...(RedisConfig.password && { password: RedisConfig.password }),
      },
    ],
    options: {
      ...(RedisConfig.tls && {
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
  duration: DatabaseConfig.cacheTime,
  ignoreErrors: true,
});
