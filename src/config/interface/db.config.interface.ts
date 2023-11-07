import { DbClient } from '@common/types';

export interface IDbConfig {
  cacheEnabled: boolean;
  cacheTime: number;
  charset: string;
  client: DbClient;
  databaseName: string;
  host: string;
  logEnabled: boolean;
  password: string;
  port: number;
  sslCertBase64?: string;
  sslEnabled: boolean;
  user: string;
}
