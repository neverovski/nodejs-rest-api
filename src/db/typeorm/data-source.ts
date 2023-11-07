import { resolve } from 'path';

import { DataSource } from 'typeorm';

import { ENV_CLI, ENV_SEED } from '@common/constants';
import { StringUtil } from '@common/utils';
import { AppConfig, DbConfig, RedisConfig } from '@config';

import { redisClusterConnect, redisConnect } from './cache-connect';
import { DbLogger } from './logger';

export const AppDataSource = new DataSource({
  type: DbConfig.client,
  host: DbConfig.host,
  port: DbConfig.port,
  username: DbConfig.user,
  password: DbConfig.password,
  database: DbConfig.databaseName,
  entities: [resolve('src/modules/**/*.entity{.ts,.js}')],
  migrations:
    AppConfig.env === ENV_SEED
      ? [resolve('src/db/seed/*{.ts,.js}')]
      : [resolve('src/db/migration/*{.ts,.js}')],
  subscribers: [resolve('src/modules/**/*.subscriber{.ts,.js}')],
  synchronize: false,
  logging: DbConfig.logEnabled,
  ...(!(AppConfig.env === ENV_CLI || AppConfig.env === ENV_SEED) && {
    logger: new DbLogger(),
  }),
  ...(DbConfig.cacheEnabled && {
    cache: RedisConfig.clusterModeEnabled
      ? redisClusterConnect()
      : redisConnect(),
  }),
  ...(DbConfig.sslEnabled && {
    ssl: {
      ...(DbConfig.sslCertBase64 && {
        ca: StringUtil.transformBase64ToSSL(DbConfig.sslCertBase64),
      }),
    },
  }),
});
