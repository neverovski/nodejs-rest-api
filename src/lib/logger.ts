import pinoToSeq from 'pino-seq';

import { AppConfig, SeqConfig } from '@config';
import { LoggerCore } from '@core';

export default new LoggerCore({
  name: AppConfig.name || '',
  env: AppConfig.env,
  ...(SeqConfig.monitoring && {
    stream: pinoToSeq.createStream({
      serverUrl: SeqConfig.serverUrl,
      apiKey: SeqConfig.apiKey,
    }),
  }),
});
