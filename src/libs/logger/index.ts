import { AppConfig, SeqConfig } from '@config';

import LoggerInstance from './logger';
import { PRETTY_PRINT } from './logger.constant';

const transportPinoSeq = {
  target: '@autotelic/pino-seq-transport',
  options: {
    loggerOpts: {
      serverUrl: SeqConfig.serverUrl,
      apiKey: SeqConfig.apiKey,
    },
  },
};

const transportPinoPretty = {
  target: 'pino-pretty',
  options: { destination: 1, ...PRETTY_PRINT },
};

export const Logger = new LoggerInstance({
  name: AppConfig.name,
  env: AppConfig.env,
  transport: SeqConfig.isEnabled ? transportPinoSeq : transportPinoPretty,
});
