import { ConfigCore } from '@core/index';

class RedisConfig extends ConfigCore {
  readonly port: number;
  readonly host: string;
  readonly password: string;
  readonly time: number;

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
    this.time = this.set<number>('REDIS_TIME', this.joi.number(), 3600);
  }
}

export default new RedisConfig();
