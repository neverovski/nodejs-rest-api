import { singleton as Singleton } from 'tsyringe';

import {
  ENV_CLI,
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
  ENV_SEED,
  ENV_TEST,
} from '@common/constants';
import { Cors } from '@common/types';
import { ConfigCore } from '@core';

import { IAppConfig } from './interface';

@Singleton()
export class AppConfig extends ConfigCore implements IAppConfig {
  cors!: Cors;
  domain!: string;
  env!:
    | typeof ENV_CLI
    | typeof ENV_DEVELOPMENT
    | typeof ENV_PRODUCTION
    | typeof ENV_SEED
    | typeof ENV_TEST;

  host!: string;
  name!: string;
  port!: number;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.domain = this.set(
      'APP_DOMAIN',
      this.schema.string().allow(null, '').default('localhost'),
    );

    this.env = this.set(
      'NODE_ENV',
      this.schema
        .string()
        .valid(ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST, ENV_CLI, ENV_SEED)
        .allow(null, '')
        .default(ENV_PRODUCTION),
    );

    this.host = this.set(
      'APP_HOST',
      this.schema.string().allow(null, '').default('http://localhost'),
    );

    this.name = this.set(
      'APP_NAME',
      this.schema.string().allow(null, '').default(''),
    );

    this.port = this.set<number>(
      'APP_PORT',
      this.schema.number().allow(null, '').default(5656),
    );

    this.cors = {
      credentials: this.set<boolean>(
        'APP_CORS_CREDENTIALS',
        this.schema.boolean().allow(null, '').default(true),
      ),
      origin: this.set(
        'APP_CORS_ORIGINS',
        this.schema.string().allow(null, '').default('localhost'),
      ),
    };
  }
}
