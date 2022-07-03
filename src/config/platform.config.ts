import { Config } from '@core/config';
import { FacebookConfig } from '@utils';

class PlatformConfig extends Config {
  readonly facebook: FacebookConfig;

  constructor() {
    super();

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
