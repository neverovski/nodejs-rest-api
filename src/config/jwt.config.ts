import { singleton as Singleton } from 'tsyringe';

import { JwtTokenType } from '@common/types';
import { ConfigCore } from '@core';

import { IJwtConfig } from './interface';

@Singleton()
export class JwtConfig extends ConfigCore implements IJwtConfig {
  accessToken!: JwtTokenType;
  refreshToken!: JwtTokenType;
  token!: JwtTokenType;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.accessToken = {
      secret: this.set(
        'JWT_SECRET_ACCESS_TOKEN',
        this.schema.string().required(),
      ),
      expiresIn: this.set(
        'JWT_EXPIRES_IN_ACCESS_TOKEN',
        this.schema.string().allow(null, '').default('15m'),
      ),
    };

    this.refreshToken = {
      secret: this.set(
        'JWT_SECRET_REFRESH_TOKEN',
        this.schema.string().required(),
      ),
      expiresIn: this.set(
        'JWT_EXPIRES_IN_REFRESH_TOKEN',
        this.schema.string().allow(null, '').default('30d'),
      ),
    };

    this.token = {
      secret: this.set('JWT_SECRET_TOKEN', this.schema.string().required()),
      expiresIn: this.set(
        'JWT_EXPIRES_IN_TOKEN',
        this.schema.string().allow(null, '').default('1d'),
      ),
    };
  }
}
