import { join } from 'path';

import { DataSource } from 'typeorm';

import { AppConfig, DBConfig, RedisConfig } from '@config';
import { ENV_CLI, ENV_PRODUCTION } from '@utils';

import TypeormLogger from './typeorm-logger';

export const AppDataSource = new DataSource({
  type: DBConfig.client,
  host: DBConfig.host,
  port: DBConfig.port,
  username: DBConfig.user,
  password: DBConfig.password,
  database: DBConfig.databaseName,
  entities: [join(__dirname, '../../modules/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migration/*{.ts,.js}')],
  subscribers: [join(__dirname, '../../modules/**/*.subscriber{.ts,.js}')],
  cli: {
    migrationsDir: join(__dirname, '../migration'),
  },
  synchronize: false,
  logging: DBConfig.debug,
  ...(AppConfig.env !== ENV_CLI && {
    logger: new TypeormLogger(),
  }),
  ...(AppConfig.env === ENV_PRODUCTION && {
    cache: {
      type: 'ioredis',
      options: {
        host: RedisConfig.host,
        port: RedisConfig.port,
        ...(RedisConfig.username && { username: RedisConfig.username }),
        ...(RedisConfig.password && { password: RedisConfig.password }),
        ...(RedisConfig.tls && {
          tls: RedisConfig.tls,
          connectTimeout: 30000,
        }),
      },
      alwaysEnabled: true,
      duration: DBConfig.cacheTime,
      ignoreErrors: true,
    },
    ...(DBConfig.ssl && {
      ssl: {
        ca: DBConfig.ssl,
      },
    }),
  }),
});
