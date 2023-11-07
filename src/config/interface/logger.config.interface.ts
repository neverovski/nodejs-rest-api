import { LogClient } from '@common/enums';

export interface ILoggerConfig {
  apiKey?: string;
  client: LogClient;
  enabled: boolean;
  sslCertBase64?: string;
  url?: string;
}
