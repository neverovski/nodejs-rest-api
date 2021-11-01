import { ConfigCore } from '@core/index';

class JwtConfig extends ConfigCore {
  readonly expiresInAccessToken: string;
  readonly expiresInRefreshToken: string;
  readonly secretAccessToken: string;
  readonly secretRefreshToken: string;

  constructor() {
    super();

    this.secretAccessToken = this.set<string>(
      'JWT_SECRET_ACCESS_TOKEN',
      this.joi.string().required(),
      '',
    );

    this.expiresInAccessToken = this.set<string>(
      'JWT_EXPIRES_IN_ACCESS_TOKEN',
      this.joi.string().required(),
      '15m',
    );

    this.secretRefreshToken = this.set<string>(
      'JWT_SECRET_REFRESH_TOKEN',
      this.joi.string().required(),
      '',
    );

    this.expiresInRefreshToken = this.set<string>(
      'JWT_EXPIRES_IN_REFRESH_TOKEN',
      this.joi.string().required(),
      '30d',
    );
  }
}

export default new JwtConfig();
