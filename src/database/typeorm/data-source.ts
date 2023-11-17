import { resolve } from 'path';

import { DataSource } from 'typeorm';

import { ENV_CLI, ENV_SEED } from '@common/constants';
import { AppConfig, DatabaseConfig, RedisConfig } from '@config';

import { redisClusterConnect, redisConnect } from './cache-connect';
import { DatabaseLogger } from './logger';

export const AppDataSource = new DataSource({
  type: DatabaseConfig.client,
  host: DatabaseConfig.host,
  port: DatabaseConfig.port,
  username: DatabaseConfig.user,
  password: DatabaseConfig.password,
  database: DatabaseConfig.databaseName,
  entities: [resolve('src/modules/**/*.entity{.ts,.js}')],
  migrations:
    AppConfig.env === ENV_SEED
      ? [resolve('src/db/seed/*{.ts,.js}')]
      : [resolve('src/db/migration/*{.ts,.js}')],
  subscribers: [resolve('src/modules/**/*.subscriber{.ts,.js}')],
  synchronize: false,
  logging: DatabaseConfig.logEnabled,
  ...(!(AppConfig.env === ENV_CLI || AppConfig.env === ENV_SEED) && {
    logger: new DatabaseLogger(),
  }),
  ...(DatabaseConfig.cacheEnabled && {
    cache: RedisConfig.clusterModeEnabled
      ? redisClusterConnect()
      : redisConnect(),
  }),
  ...(DatabaseConfig?.ssl?.enabled && {
    ssl: { ...(DatabaseConfig?.ssl?.ca && { ca: DatabaseConfig.ssl.ca }) },
  }),
});
