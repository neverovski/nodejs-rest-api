import { ConfigCore } from '@core';

class RedisConfig extends ConfigCore {
  readonly host: string;
  readonly password: string;
  readonly port: number;
  readonly queuePrefix: string;
  readonly tls: boolean;
  readonly username: string;

  constructor() {
    super();

    this.port = this.set<number>(
      'REDIS_PORT',
      this.joi.number().required(),
      6379,
    );

    this.host = this.set<string>(
      'REDIS_HOST',
      this.joi.string().required(),
      '127.0.0.1',
    );

    this.password = this.set<string>(
      'REDIS_PASSWORD',
      this.joi.string().allow(null, ''),
      '',
    );

    this.queuePrefix = this.set<string>(
      'QUEUE_PREFIX',
      this.joi.string().required(),
      'ANGELS',
    );

    this.username = this.set<string>(
      'REDIS_USERNAME',
      this.joi.string().allow(null, ''),
      '',
    );

    this.tls = this.set<boolean>('REDIS_TLS', this.joi.boolean(), false);
  }
}

export default new RedisConfig();
