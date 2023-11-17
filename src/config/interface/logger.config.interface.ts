import { LogClient } from '@common/enums';
import { ConfigSSL } from '@common/types';

export interface ILoggerConfig {
  apiKey?: string;
  client: LogClient;
  enabled: boolean;
  ssl?: Pick<ConfigSSL, 'ca'>;
  url?: string;
}
