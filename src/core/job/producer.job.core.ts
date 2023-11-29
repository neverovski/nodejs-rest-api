import type { Queue } from 'bull';

import { QueueUtil } from '@common/utils';
import { IRedisConfig } from '@config';

export class ProducerCoreJob {
  private queue: Queue;

  constructor(name: string, redisConfig: IRedisConfig) {
    this.queue = QueueUtil.connect(name, redisConfig);
  }

  protected addJob<T>(name: string, data: T) {
    return this.queue.add(name, data);
  }
}
