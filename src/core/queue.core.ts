import Bull from 'bull';
import ms from 'ms';

import { RedisConfig } from '@config/index';
import { EventEmitter } from '@utils/index';

import Logger from './logger';

export default class QueueCore {
  readonly queue: Bull.Queue;

  constructor(
    name: string,
    opts?: Pick<Bull.QueueOptions, 'limiter' | 'defaultJobOptions'>,
  ) {
    this.queue = new Bull(name, {
      redis: {
        port: RedisConfig.port,
        host: RedisConfig.host,
        password: RedisConfig.password,
      },
      prefix: RedisConfig.queuePrefix,
      ...this.queueOptions,
      ...opts,
    });

    this.eventError();
  }

  private get queueOptions() {
    return {
      limiter: { max: 30, duration: ms('5s') },
      defaultJobOptions: {
        attempts: 30,
        backoff: {
          type: 'fixed',
          delay: ms('1m'),
        },
      },
    };
  }

  private eventError() {
    this.queue.on('error', Logger.error);
    EventEmitter.once('close', async () => {
      await this.queue.close();
    });
  }
}
