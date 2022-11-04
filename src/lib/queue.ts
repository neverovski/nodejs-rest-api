import Bull from 'bull';

import { RedisConfig } from '@config';
import { DateHelper, EventEmitter } from '@helpers';
import { LoggerType } from '@utils';

import { Logger } from './logger';

export default class Queue {
  readonly queue: Bull.Queue;

  constructor(
    name: string,
    opts?: Pick<Bull.QueueOptions, 'limiter' | 'defaultJobOptions'>,
  ) {
    this.queue = new Bull(name, {
      redis: {
        host: RedisConfig.host,
        port: RedisConfig.port,
        ...(RedisConfig.username && { username: RedisConfig.username }),
        ...(RedisConfig.username && { password: RedisConfig.password }),
        ...(RedisConfig.tls && {
          tls: {},
          connectTimeout: 30000,
        }),
      },
      prefix: RedisConfig.queuePrefix,
      limiter: { max: 30, duration: DateHelper.toMs('5s') },
      defaultJobOptions: {
        attempts: 30,
        backoff: {
          type: 'fixed',
          delay: DateHelper.toMs('1m'),
        },
      },
      ...opts,
    });

    this.eventError();
    this.init();
  }

  protected handleError(error: unknown) {
    Logger.error({
      message: this.constructor.name,
      error,
      type: LoggerType.QUEUE,
    });
  }

  private eventError() {
    this.queue.on('error', (error) => {
      Logger.error({
        message: this.constructor.name,
        error,
        type: LoggerType.QUEUE,
      });
    });

    EventEmitter.once('close', async () => {
      await this.queue.close();
    });
  }

  private init() {
    Logger.info({
      message: `${this.constructor.name} initialized...`,
    });
  }
}
