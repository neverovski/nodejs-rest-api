import { singleton as Singleton } from 'tsyringe';

import { CACHE_TIME } from '@common/constants';
import { ConfigSSL, DatabaseClient } from '@common/types';
import { StringUtil } from '@common/utils';
import { ConfigCore } from '@core';

import { IDatabaseConfig } from './interface';

@Singleton()
export class DatabaseConfig extends ConfigCore implements IDatabaseConfig {
  cacheEnabled!: boolean;
  cacheTime!: number;
  charset!: string;
  client!: DatabaseClient;
  databaseName!: string;
  host!: string;
  logEnabled!: boolean;
  password!: string;
  port!: number;
  ssl!: ConfigSSL;
  sslEnabled!: boolean;
  user!: string;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.cacheEnabled = this.set(
      'DB_CACHE_ENABLED',
      this.schema.boolean().allow(null, '').default(false),
    );

    this.cacheTime = this.set(
      'DB_CACHE_TIME',
      this.schema.number().allow(null, '').default(CACHE_TIME),
    );

    this.charset = this.set(
      'DB_CHARSET',
      this.schema.string().valid('utf8').allow(null, '').default('utf8'),
    );

    this.client = this.set(
      'DB_CLIENT',
      this.schema
        .string()
        .valid('postgres')
        .allow(null, '')
        .default('postgres'),
    );

    this.databaseName = this.set(
      'DB_NAME',
      this.schema.string().min(4).max(100).required(),
    );

    this.logEnabled = this.set(
      'DB_LOG_ENABLED',
      this.schema.boolean().allow(null, '').default(true),
    );

    this.host = this.set(
      'DB_HOST',
      this.schema.string().min(4).max(100).allow(null, '').default('127.0.0.1'),
    );

    this.password = this.set('DB_PASSWORD', this.schema.string().required());

    this.port = this.set(
      'DB_PORT',
      this.schema.number().allow(null, '').default(5432),
    );

    this.ssl = {
      ca: StringUtil.decodeBase64ToString(
        this.set('DB_SSL_CA_BASE64', this.schema.string().allow(null, '')),
      ),
      enabled: this.set(
        'DB_SSL_ENABLED',
        this.schema.boolean().allow(null, '').default(false),
      ),
    };

    this.user = this.set(
      'DB_USER',
      this.schema.string().min(4).max(100).required(),
    );
  }
}
