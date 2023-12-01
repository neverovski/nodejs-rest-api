import { resolve } from 'path';

import { DataSource } from 'typeorm';

import { ENV_CLI, ENV_SEED } from '@common/constants';
import { IAppConfig, IDatabaseConfig, IRedisConfig } from '@config';
import { ILoggerService } from '@providers/logger';

import { redisClusterConnect, redisConnect } from './cache-connect';
import { DatabaseLogger } from './logger';

export const AppDataSource = (
  appConfig: IAppConfig,
  databaseConfig: IDatabaseConfig,
  loggerService: ILoggerService,
  redisConfig: IRedisConfig,
) =>
  new DataSource({
    type: databaseConfig.client,
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.databaseName,
    entities: [resolve('src/modules/**/*.entity{.ts,.js}')],
    migrations:
      appConfig.env === ENV_SEED
        ? [resolve('src/db/seed/*{.ts,.js}')]
        : [resolve('src/db/migration/*{.ts,.js}')],
    subscribers: [resolve('src/modules/**/*.subscriber{.ts,.js}')],
    synchronize: false,
    logging: databaseConfig.logEnabled,
    ...(!(appConfig.env === ENV_CLI || appConfig.env === ENV_SEED) && {
      logger: new DatabaseLogger(loggerService),
    }),
    ...(databaseConfig.cacheEnabled && {
      cache: redisConfig.clusterModeEnabled
        ? redisClusterConnect(redisConfig, databaseConfig.cacheTime)
        : redisConnect(redisConfig, databaseConfig.cacheTime),
    }),
    ...(databaseConfig?.ssl?.enabled && {
      ssl: { ...(databaseConfig?.ssl?.ca && { ca: databaseConfig.ssl.ca }) },
    }),
  });
