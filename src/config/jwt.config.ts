import { ConfigCore } from '@core/index';

class JwtConfig extends ConfigCore {
  readonly secretAccessToken: string;
  readonly secretRefreshToken: string;
  readonly expiresInAccessToken: string;
  readonly expiresInRefreshToken: string;

  constructor() {
    super();

    this.secretAccessToken = this.set<string>(
      'SECRET_ACCESS_TOKEN',
      this.joi.string().required(),
      '',
    );
    this.secretRefreshToken = this.set<string>(
      'SECRET_REFRESH_TOKEN',
      this.joi.string().required(),
      '',
    );
    this.expiresInAccessToken = this.set<string>(
      'EXPIRES_IN_ACCESS_TOKEN',
      this.joi.string().required(),
      '',
    );
    this.expiresInRefreshToken = this.set<string>(
      'EXPIRES_IN_REFRESH_TOKEN',
      this.joi.string().required(),
      '',
    );
  }
}

export default new JwtConfig();
