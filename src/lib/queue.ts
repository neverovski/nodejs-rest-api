import Bull from 'bull';
import ms from 'ms';

import { RedisConfig } from '@config';
import { Logger } from '@core/logger';
import { LoggerType } from '@utils';
import { EventEmitter } from '@utils/helpers';

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
      ...this.queueOptions,
      ...opts,
    });

    this.eventError();
    this.init();
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

  protected handleError(error: unknown) {
    Logger.error({
      message: this.constructor.name,
      error,
      type: LoggerType.QUEUE,
    });
  }

  private eventError() {
    this.queue.on('error', (error) => {
      Logger.error({ message: 'QueueCore', error, type: LoggerType.QUEUE });
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
