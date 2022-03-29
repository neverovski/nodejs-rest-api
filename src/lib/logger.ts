import pinoToSeq from 'pino-seq';

import { AppConfig, SeqConfig } from '@config';
import { LoggerCore } from '@core';
import { ENV_PRODUCTION } from '@utils';

export default new LoggerCore({
  name: AppConfig.name || '',
  env: AppConfig.env,
  ...(AppConfig.env === ENV_PRODUCTION && {
    stream: pinoToSeq.createStream({
      serverUrl: SeqConfig.serverUrl,
      apiKey: SeqConfig.apiKey,
    }),
  }),
});
