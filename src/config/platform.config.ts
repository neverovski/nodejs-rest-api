import {
  AppleConfig,
  FacebookConfig,
  GitHubConfig,
  GoogleConfig,
} from '@utils';

import { ConfigInstance } from './instance';

class PlatformConfig extends ConfigInstance {
  readonly apple: AppleConfig;
  readonly facebook: FacebookConfig;
  readonly github: GitHubConfig;
  readonly google: GoogleConfig;

  constructor() {
    super();

    this.apple = {
      url: this.set<string>('APPLE_URL', this.joi.string().required(), ''),
    };

    this.facebook = {
      url: this.set<string>('FACEBOOK_URL', this.joi.string().required(), ''),
      fields: this.set<string>(
        'FACEBOOK_FIELDS',
        this.joi.string().required(),
        '',
      ),
    };

    this.google = {
      clientId: this.set<string>(
        'GOOGLE_CLIENT_ID',
        this.joi.string().required(),
        '',
      ),
    };

    this.github = {
      url: this.set<string>('GITHUB_URL', this.joi.string().required(), ''),
    };
  }
}

export default new PlatformConfig();
