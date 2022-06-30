import { Config } from '@core/config';

class SeqConfig extends Config {
  readonly apiKey: string;
  readonly monitoring: boolean;
  readonly serverUrl: string;

  constructor() {
    super();

    this.serverUrl = this.set<string>(
      'SEQ_SERVER_URL',
      this.joi.string().required(),
      '',
    );

    this.apiKey = this.set<string>(
      'SEQ_API_KEY',
      this.joi.string().required(),
      '',
    );

    this.monitoring = this.set<boolean>(
      'SEQ_MONITORING',
      this.joi.boolean(),
      false,
    );
  }
}

export default new SeqConfig();
