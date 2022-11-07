import { ConfigInstance } from './instance';

class SeqConfig extends ConfigInstance {
  readonly apiKey: string;
  readonly monitoring: boolean;
  readonly serverUrl: string;

  constructor() {
    super();

    this.apiKey = this.set<string>('SEQ_API_KEY', this.joi.string().required());

    this.monitoring = this.set<boolean>(
      'SEQ_MONITORING',
      this.joi.boolean(),
      false,
    );

    this.serverUrl = this.set<string>(
      'SEQ_SERVER_URL',
      this.joi.string().required(),
    );
  }
}

export default new SeqConfig();
