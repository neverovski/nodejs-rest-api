import path, { resolve } from 'path';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ENV_TEST } from '@common/constants';
import { StringUtil } from '@common/utils';

import { PathUtil } from '../utils';

config({
  path: path.join(process.cwd(), '.env'),
});

export const AppDataSource = new DataSource({
  type: (process.env.DB_CLIENT ?? 'postgres') as 'postgres',
  host: String(process.env.DB_HOST) ?? '127.0.0.1',
  port: parseInt(String(process.env.DB_PORT)),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  migrations: PathUtil.getMigrations(String(process.env.NODE_ENV) ?? ENV_TEST),
  subscribers: [resolve('src/modules/**/*.subscriber{.ts,.js}')],
  migrationsTableName: PathUtil.getMigrationsTableName(
    String(process.env.NODE_ENV) ?? ENV_TEST,
  ),
  entities: [resolve('src/modules/**/*.entity{.ts,.js}')],
  synchronize: false,
  logging: (process.env.DB_LOG_ENABLED ?? false) as boolean,
  ...(process.env.DB_SSL_ENABLED && {
    ssl: {
      ...(process.env.DB_SSL_CA_BASE64 && {
        ca: StringUtil.decodeBase64ToString(process.env.DB_SSL_CA_BASE64),
      }),
    },
  }),
});
