import { ConfigCore } from '@core/index';

class DBConfig extends ConfigCore {
  readonly client: string;
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly database: string;
  readonly charset: string;
  readonly debug: boolean;

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
  }
}

export default new DBConfig();
