import { JwtType } from '@common/types';
import { ConfigCore } from '@core';

import { IJwtConfig } from './interface';

class JwtConfig extends ConfigCore implements IJwtConfig {
  accessToken!: JwtType;
  refreshToken!: JwtType;
  token!: JwtType;

  init() {
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

export default new JwtConfig();
