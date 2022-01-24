import { ConfigCore } from '@core/index';
import { CACHE_TIME } from '@utils/index';

class DBConfig extends ConfigCore {
  readonly cacheTime: number;
  readonly charset: string;
  readonly client: string;
  readonly database: string;
  readonly debug: boolean;
  readonly host: string;
  readonly password: string;
  readonly port: number;
  readonly user: string;

  constructor() {
    super();

    this.client = 'postgres';
    this.host = this.set<string>(
      'DB_HOST',
      this.joi.string().min(4).max(100).required(),
      '127.0.0.1',
    );
    this.port = this.set<number>('DB_PORT', this.joi.number().required(), 5432);
    this.user = this.set<string>(
      'DB_USER',
      this.joi.string().min(4).max(100).required(),
      null,
    );
    this.password = this.set<string>(
      'DB_PASSWORD',
      this.joi.string().required(),
      null,
    );
    this.database = this.set<string>(
      'DB_NAME',
      this.joi.string().min(4).max(100).required(),
      null,
    );
    this.charset = this.set<string>(
      'DB_CHARSET',
      this.joi.string().valid('utf8').required(),
      'utf8',
    );
    this.debug = this.set<boolean>('DB_DEBUG', this.joi.boolean(), false);
    this.cacheTime = this.set<number>(
      'DB_CACHE_TIME',
      this.joi.number(),
      CACHE_TIME,
    );
  }
}

export default new DBConfig();
