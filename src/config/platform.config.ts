import { Config } from '@core/config';
import { AppleConfig, FacebookConfig } from '@utils';

class PlatformConfig extends Config {
  readonly apple: AppleConfig;
  readonly facebook: FacebookConfig;

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
  }
}

export default new PlatformConfig();
