import { singleton as Singleton } from 'tsyringe';

import { ConfigCore } from '@core';

import { IEmailConfig } from './interface';

@Singleton()
export class EmailConfig extends ConfigCore implements IEmailConfig {
  driver!: string;
  encryption!: string;
  host!: string;
  name!: string;
  password!: string;
  port!: number;
  username!: string;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.driver = this.set('MAIL_DRIVER', this.schema.string().required());
    this.encryption = this.set(
      'MAIL_ENCRYPTION',
      this.schema.string().required(),
    );
    this.host = this.set('MAIL_HOST', this.schema.string().required());
    this.name = this.set('MAIL_NAME', this.schema.string().required());
    this.password = this.set('MAIL_PASSWORD', this.schema.string().required());
    this.port = this.set<number>('MAIL_PORT', this.schema.number().required());
    this.username = this.set('MAIL_USERNAME', this.schema.string().required());
  }
}
