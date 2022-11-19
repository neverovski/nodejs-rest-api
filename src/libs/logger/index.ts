import pinoToSeq from 'pino-seq';

import { AppConfig, SeqConfig } from '@config';

import LoggerInstance from './logger';

export const Logger = new LoggerInstance({
  name: AppConfig.name,
  env: AppConfig.env,
  ...(SeqConfig.monitoring && {
    stream: pinoToSeq.createStream({
      serverUrl: SeqConfig.serverUrl,
      apiKey: SeqConfig.apiKey,
    }),
  }),
});
