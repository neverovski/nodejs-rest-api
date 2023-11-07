import type { Queue } from 'bull';

import { QueueUtil } from '@common/utils';

export class ProducerCoreJob {
  private queue: Queue;

  constructor(name: string) {
    this.queue = QueueUtil.connect(name);
  }

  protected addJob<T>(name: string, data: T) {
    return this.queue.add(name, data);
  }
}
