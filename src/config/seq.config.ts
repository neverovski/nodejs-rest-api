import { ConfigCore } from '@core';

class SeqConfig extends ConfigCore {
  readonly apiKey: string;
  readonly serverUrl: string;

  constructor() {
    super();

    this.serverUrl = this.set<string>(
      'SEQ_SERVER_URL',
      this.joi.string().allow(null, ''),
      '',
    );

    this.apiKey = this.set<string>(
      'SEQ_API_KEY',
      this.joi.string().allow(null, ''),
      '',
    );
  }
}

export default new SeqConfig();
