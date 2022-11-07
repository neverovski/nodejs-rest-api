import type { Job, JobOptions } from 'bull';
import { container } from 'tsyringe';

import { DateHelper, EventEmitter } from '@helpers';
import { Queue } from '@lib';

import { EMAIL_MESSAGE, EMAIL_QUEUE } from './email.constant';
import { EmailInject, EmailMessage } from './email.type';
import { IEmailQueue, IEmailService } from './interface';

export default class EmailQueue extends Queue implements IEmailQueue {
  private readonly emailService: IEmailService;

  constructor() {
    super(EMAIL_QUEUE, {
      defaultJobOptions: {
        attempts: 30,
        removeOnComplete: true,
        backoff: {
          type: 'exponential',
          delay: DateHelper.toMs('1s'),
        },
      },
    });

    this.emailService = container.resolve<IEmailService>(
      EmailInject.EMAIL_SERVICE,
    );
    this.start();
  }

  sendEmail(data: EmailMessage, opt?: JobOptions) {
    void this.queue.add(EMAIL_MESSAGE, data, opt);
  }

  protected start() {
    EventEmitter.once('start', () => {
      void this.queue.process(EMAIL_MESSAGE, (job: Job<EmailMessage>) =>
        this.handleSendEmail(job),
      );
    });
  }

  private async handleSendEmail(job: Job<EmailMessage>) {
    try {
      await this.emailService.sendEmail(job.data);

      await job.progress(100);

      return await Promise.resolve();
    } catch (err) {
      this.handleError(err);

      return Promise.reject(err);
    }
  }
}
