import { ConfigInstance } from './instance';

class EmailConfig extends ConfigInstance {
  readonly driver: string;
  readonly encryption: string;
  readonly host: string;
  readonly name: string;
  readonly password: string;
  readonly port: number;
  readonly username: string;

  constructor() {
    super();

    this.driver = this.set<string>(
      'MAIL_DRIVER',
      this.joi.string().required(),
      '',
    );
    this.host = this.set<string>('MAIL_HOST', this.joi.string().required(), '');
    this.port = this.set<number>(
      'MAIL_PORT',
      this.joi.number().required(),
      null,
    );
    this.username = this.set<string>(
      'MAIL_USERNAME',
      this.joi.string().required(),
      '',
    );
    this.password = this.set<string>(
      'MAIL_PASSWORD',
      this.joi.string().required(),
      '',
    );
    this.encryption = this.set<string>(
      'MAIL_ENCRYPTION',
      this.joi.string().required(),
      '',
    );
    this.name = this.set<string>('MAIL_NAME', this.joi.string().required(), '');
  }
}

export default new EmailConfig();
