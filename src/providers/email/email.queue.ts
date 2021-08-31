import Bull from 'bull';
import ms from 'ms';

import { AppConfig, RedisConfig } from '@config/index';
import { Logger } from '@core/index';
import { EventEmitter } from '@utils/index';

import { EMAIL_QUEUQ } from './email.constant';

export const EmailQueue = new Bull(EMAIL_QUEUQ, {
  redis: {
    port: RedisConfig.port,
    host: RedisConfig.host,
    password: RedisConfig.password,
  },
  prefix: AppConfig.name,
  limiter: { max: 30, duration: ms('5s') },
  defaultJobOptions: {
    attempts: 30,
    backoff: {
      type: 'fixed',
      delay: ms('1m'),
    },
  },
});

EventEmitter.once('close', async () => {
  await EmailQueue.close();
});

EmailQueue.on('error', Logger.error);

EventEmitter.once('start', () => {
  // EmailQueue.process
});
