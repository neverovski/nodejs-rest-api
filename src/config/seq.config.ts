import { ISeqConfig } from '@common/interfaces';
import { ConfigCore } from '@core';

class SeqConfig extends ConfigCore implements ISeqConfig {
  apiKey!: string | null;
  enabled!: boolean;
  serverUrl!: string | null;

  init() {
    this.apiKey = this.set('SEQ_API_KEY', this.schema.string().allow(null, ''));

    this.enabled = this.set(
      'SEQ_ENABLED',
      this.schema.boolean().allow(null, '').default(false),
    );

    this.serverUrl = this.set(
      'SEQ_SERVER_URL',
      this.schema.string().allow(null, ''),
    );
  }
}

export default new SeqConfig();
