import { LogClient } from '@common/enums';
import { ConfigCore } from '@core';

import { ILoggerConfig } from './interface';

class LoggerConfig extends ConfigCore implements ILoggerConfig {
  apiKey?: string | undefined;
  client!: LogClient;
  enabled!: boolean;
  sslCertBase64?: string | undefined;
  url?: string | undefined;

  init() {
    this.apiKey = this.set<string>(
      'LOG_API_KEY',
      this.schema.string().allow(null, ''),
    );

    this.client = this.set<LogClient>(
      'LOG_CLIENT',
      this.schema
        .string()
        .valid(LogClient.CONSOLE, LogClient.ECS, LogClient.SEQ)
        .allow(null, '')
        .default(LogClient.CONSOLE),
    );

    this.enabled = this.set<boolean>(
      'LOG_ENABLED',
      this.schema.boolean().allow(null, '').default('true'),
    );

    this.url = this.set<string>(
      'LOG_URL',
      this.schema.string().allow(null, ''),
    );

    this.sslCertBase64 = this.set<string>(
      'LOG_SSL_CERT_BASE64',
      this.schema.string().allow(null, ''),
    );
  }
}

export default new LoggerConfig();
