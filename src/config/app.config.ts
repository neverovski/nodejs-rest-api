import { ENV_CLI, ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST } from '@utils';

import { ConfigInstance } from './instance';

class AppConfig extends ConfigInstance {
  readonly domain: string;
  readonly env: string;
  readonly host: string;
  readonly name: string;
  readonly port: number;

  constructor() {
    super();

    this.domain = this.set<string>(
      'APP_DOMAIN',
      this.joi.string().required(),
      'localhost',
    );
    this.env = this.set<string>(
      'APP_ENV',
      this.joi
        .string()
        .valid(ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST, ENV_CLI),
      ENV_DEVELOPMENT,
    );
    this.name = this.set<string>('APP_NAME', this.joi.string().required(), '');
    this.port = this.set<number>(
      'APP_PORT',
      this.joi.number().port().required(),
      5656,
    );
    this.host = this.set<string>(
      'APP_HOST',
      this.joi.string().required(),
      'http://localhost',
    );
  }
}

export default new AppConfig();
