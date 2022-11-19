import { ConfigInstance } from './instance';

class JwtConfig extends ConfigInstance {
  readonly expiresInAccessToken: string;
  readonly expiresInRefreshToken: string;
  readonly expiresInToken: string;
  readonly secretAccessToken: string;
  readonly secretRefreshToken: string;
  readonly secretToken: string;

  constructor() {
    super();

    this.expiresInAccessToken = this.set<string>(
      'JWT_EXPIRES_IN_ACCESS_TOKEN',
      this.joi.string().allow(null, ''),
      '15m',
    );

    this.expiresInRefreshToken = this.set<string>(
      'JWT_EXPIRES_IN_REFRESH_TOKEN',
      this.joi.string().allow(null, ''),
      '30d',
    );

    this.expiresInToken = this.set<string>(
      'JWT_EXPIRES_IN_TOKEN',
      this.joi.string().allow(null, ''),
      '1d',
    );

    this.secretAccessToken = this.set<string>(
      'JWT_SECRET_ACCESS_TOKEN',
      this.joi.string().required(),
    );

    this.secretRefreshToken = this.set<string>(
      'JWT_SECRET_REFRESH_TOKEN',
      this.joi.string().required(),
    );

    this.secretToken = this.set<string>(
      'JWT_SECRET_TOKEN',
      this.joi.string().required(),
    );
  }
}

export default new JwtConfig();
