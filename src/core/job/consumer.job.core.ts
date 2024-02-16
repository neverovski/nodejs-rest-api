import type { Job, Queue } from 'bull';

import { JobHandler } from '@common/types';
import { QueueUtil } from '@common/utils';
import { IRedisConfig } from '@config';
import { ILoggerService } from '@providers/logger';

export class ConsumerCoreJob {
  protected readonly logger?: ILoggerService;
  private concurrency: number;
  private jobHandlers: Map<string, JobHandler>;
  private queue: Queue;

  constructor(name: string, redisConfig: IRedisConfig, concurrency = 1) {
    this.concurrency = concurrency;
    this.jobHandlers = new Map();

    this.queue = QueueUtil.connect(name, redisConfig);
  }

  startProcessJob() {
    void this.queue.process(this.concurrency, this.processJob.bind(this));
  }

  protected registerJobHandler<T>(name: string, handler: JobHandler<T>) {
    this.jobHandlers.set(name, handler);
  }

  //TODO: add logger
  private async processJob(job: Job) {
    const jobName = job.name;
    const jobHandler = this.jobHandlers.get(jobName);

    if (jobHandler) {
      await jobHandler.call(this, job);
    } else {
      if (this.logger) {
        this.logger.error(this.constructor.name, {
          err: `No handler found for job type: ${jobName}`,
        });
      }

      await job.discard();
    }
  }
}
