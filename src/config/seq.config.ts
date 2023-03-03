import { ConfigInstance } from './instance';

class SeqConfig extends ConfigInstance {
  readonly apiKey: string | null;
  readonly isEnabled: boolean;
  readonly serverUrl: string | null;

  constructor() {
    super();

    this.apiKey = this.set<string | null>(
      'SEQ_API_KEY',
      this.joi.string().allow(null, ''),
    );

    this.isEnabled = this.set<boolean>(
      'SEQ_ENABLED',
      this.joi.boolean(),
      false,
    );

    this.serverUrl = this.set<string | null>(
      'SEQ_SERVER_URL',
      this.joi.string().allow(null, ''),
    );
  }
}

export default new SeqConfig();
