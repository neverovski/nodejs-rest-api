import { CACHE_TIME, DBClient } from '@utils';

import { ConfigInstance } from './instance';

class DBConfig extends ConfigInstance {
  readonly cacheTime: number;
  readonly charset: string;
  readonly client: DBClient;
  readonly databaseName: string;
  readonly debug: boolean;
  readonly host: string;
  readonly password: string;
  readonly port: number;
  readonly ssl: string;
  readonly user: string;

  constructor() {
    super();

    this.cacheTime = this.set<number>(
      'DB_CACHE_TIME',
      this.joi.number().allow(null, ''),
      CACHE_TIME,
    );

    this.charset = this.set<string>(
      'DB_CHARSET',
      this.joi.string().valid('utf8').allow(null, ''),
      'utf8',
    );

    this.client = this.set<DBClient>(
      'DB_CLIENT',
      this.joi.string().valid('postgres').allow(null, ''),
      'postgres',
    );

    this.databaseName = this.set<string>(
      'DB_NAME',
      this.joi.string().min(4).max(100).required(),
    );

    this.debug = this.set<boolean>(
      'DB_DEBUG',
      this.joi.boolean().allow(null, ''),
      false,
    );

    this.host = this.set<string>(
      'DB_HOST',
      this.joi.string().min(4).max(100).allow(null, ''),
      '127.0.0.1',
    );

    this.password = this.set<string>(
      'DB_PASSWORD',
      this.joi.string().required(),
    );

    this.port = this.set<number>('DB_PORT', this.joi.number().required());

    this.ssl = this.set<string>(
      'DB_SSL_CERT',
      this.joi.string().allow(null, ''),
    );

    this.user = this.set<string>(
      'DB_USER',
      this.joi.string().min(4).max(100).required(),
    );
  }
}

export default new DBConfig();
