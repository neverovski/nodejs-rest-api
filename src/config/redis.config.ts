import { ConfigInstance } from './instance';

class RedisConfig extends ConfigInstance {
  readonly host: string;
  readonly password: string;
  readonly port: number;
  readonly queuePrefix: string;
  readonly tls: boolean;
  readonly username: string;

  constructor() {
    super();

    this.host = this.set<string>(
      'REDIS_HOST',
      this.joi.string().allow(null, ''),
      '127.0.0.1',
    );

    this.password = this.set<string>(
      'REDIS_PASSWORD',
      this.joi.string().allow(null, ''),
    );

    this.port = this.set<number>(
      'REDIS_PORT',
      this.joi.number().allow(null, ''),
      6379,
    );

    this.queuePrefix = this.set<string>(
      'REDIS_QUEUE_PREFIX',
      this.joi.string().allow(null, ''),
      'AUTH',
    );

    this.tls = this.set<boolean>(
      'REDIS_TLS',
      this.joi.boolean().allow(null, ''),
      false,
    );

    this.username = this.set<string>(
      'REDIS_USERNAME',
      this.joi.string().allow(null, ''),
    );
  }
}

export default new RedisConfig();
