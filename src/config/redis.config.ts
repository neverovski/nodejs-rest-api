import { singleton as Singleton } from 'tsyringe';

import { ConfigCore } from '@core';

import { IRedisConfig } from './interface';

@Singleton()
export class RedisConfig extends ConfigCore implements IRedisConfig {
  clusterModeEnabled!: boolean;
  host!: string;
  password!: string;
  port!: number;
  queuePrefix!: string;
  tls!: boolean;
  username!: string;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.clusterModeEnabled = this.set(
      'REDIS_CLUSTER_MODE_ENABLED',
      this.schema.boolean().allow(null, '').default(false),
    );

    this.host = this.set(
      'REDIS_HOST',
      this.schema.string().allow(null, '').default('127.0.0.1'),
    );

    this.password = this.set<string>(
      'REDIS_PASSWORD',
      this.schema.string().allow(null, ''),
    );

    this.port = this.set<number>(
      'REDIS_PORT',
      this.schema.number().allow(null, '').default(6379),
    );

    this.queuePrefix = this.set<string>(
      'REDIS_QUEUE_PREFIX',
      this.schema.string().allow(null, '').default('worker'),
    );

    this.tls = this.set<boolean>(
      'REDIS_TLS',
      this.schema.boolean().allow(null, '').default(false),
    );

    this.username = this.set<string>(
      'REDIS_USERNAME',
      this.schema.string().allow(null, ''),
    );
  }
}
