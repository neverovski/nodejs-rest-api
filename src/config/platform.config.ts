import { singleton as Singleton } from 'tsyringe';

import {
  AppleConfigType,
  FacebookConfigType,
  GitHubConfigType,
  GoogleConfigType,
} from '@common/types';
import { ConfigCore } from '@core';

import { IPlatformConfig } from './interface';

@Singleton()
export class PlatformConfig extends ConfigCore implements IPlatformConfig {
  apple!: AppleConfigType;
  facebook!: FacebookConfigType;
  github!: GitHubConfigType;
  google!: GoogleConfigType;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.apple = {
      url: this.set<string>('APPLE_URL', this.schema.string().required()),
    };

    this.facebook = {
      url: this.set<string>('FACEBOOK_URL', this.schema.string().required()),
      fields: this.set<string>(
        'FACEBOOK_FIELDS',
        this.schema.string().required(),
      ),
    };

    this.github = {
      url: this.set<string>('GITHUB_URL', this.schema.string().required()),
    };

    this.google = {
      url: this.set<string>('GOOGLE_URL', this.schema.string().required()),
    };
  }
}
