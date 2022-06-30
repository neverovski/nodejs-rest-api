import { Config } from '@core/config';

class JwtConfig extends Config {
  readonly expiresInAccessToken: string;
  readonly expiresInRefreshToken: string;
  readonly expiresInToken: string;
  readonly secretAccessToken: string;
  readonly secretRefreshToken: string;
  readonly secretToken: string;

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

    this.secretToken = this.set<string>(
      'JWT_SECRET_TOKEN',
      this.joi.string().required(),
      '',
    );

    this.expiresInToken = this.set<string>(
      'JWT_EXPIRES_IN_TOKEN',
      this.joi.string().required(),
      '1d',
    );
  }
}

export default new JwtConfig();
