import { singleton as Singleton } from 'tsyringe';

import { LogClient } from '@common/enums';
import { ConfigSSL } from '@common/types';
import { StringUtil } from '@common/utils';
import { ConfigCore } from '@core';

import { ILoggerConfig } from './interface';

@Singleton()
export class LoggerConfig extends ConfigCore implements ILoggerConfig {
  apiKey?: string | undefined;
  client!: LogClient;
  enabled!: boolean;
  ssl!: Pick<ConfigSSL, 'ca'>;
  url?: string | undefined;

  constructor() {
    super();

    this.init();
  }

  protected init() {
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

    this.ssl = {
      ca: StringUtil.decodeBase64ToString(
        this.set('LOG_SSL_CA_BASE64', this.schema.string().allow(null, '')),
      ),
    };
  }
}
