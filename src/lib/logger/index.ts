import pinoToSeq from 'pino-seq';

import { AppConfig, SeqConfig } from '@config';

import Logger from './logger';

export default new Logger({
  name: AppConfig.name || '',
  env: AppConfig.env,
  ...(SeqConfig.monitoring && {
    stream: pinoToSeq.createStream({
      serverUrl: SeqConfig.serverUrl,
      apiKey: SeqConfig.apiKey,
    }),
  }),
});
