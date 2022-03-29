import { join } from 'path';

import { createConnection, Connection } from 'typeorm';

import { AppConfig, DBConfig, RedisConfig } from '@config';
import { TypeormLogger } from '@lib';
import { ENV_PRODUCTION } from '@utils';

import './polyfill';

export default class DBConnection {
  async connect(): Promise<Connection> {
    return createConnection({
      type: 'postgres',
      host: DBConfig.host,
      port: DBConfig.port,
      username: DBConfig.user,
      password: DBConfig.password,
      database: DBConfig.database,
      entities: [join(__dirname, '/../modules/**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, './migration/*{.ts,.js}')],
      subscribers: [join(__dirname, '/../modules/**/*.subscriber{.ts,.js}')],
      cli: {
        migrationsDir: './migration',
      },
      synchronize: false,
      logging: DBConfig.debug,
      logger: new TypeormLogger(),
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
  }
}
