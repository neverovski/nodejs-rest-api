import { ConfigSSL, DatabaseClient } from '@common/types';

export interface IDatabaseConfig {
  cacheEnabled: boolean;
  cacheTime: number;
  charset: string;
  client: DatabaseClient;
  databaseName: string;
  host: string;
  logEnabled: boolean;
  password: string;
  port: number;
  ssl?: ConfigSSL;
  user: string;
}
