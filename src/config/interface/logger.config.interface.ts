import { LogClient } from '@common/enums';
import { ConfigSSL } from '@common/types';

export interface ILoggerConfig {
  apiKey?: string;
  client: LogClient;
  ssl?: ConfigSSL;
  url?: string;
}
