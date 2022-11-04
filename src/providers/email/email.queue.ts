import Bull from 'bull';
import { container } from 'tsyringe';

import { DateHelper, EventEmitter } from '@helpers';
import { Queue } from '@lib';

import { EMAIL_MESSAGE, EMAIL_QUEUE } from './email.constant';
import { EmailInject, EmailMessage } from './email.type';
import { IEmailQueue, IEmailService } from './interface';

export default class EmailQueue extends Queue implements IEmailQueue {
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

    this.start();
  }

  private get emailService() {
    return container.resolve<IEmailService>(EmailInject.EMAIL_SERVICE);
  }

  addSendMessageToQueue(data: EmailMessage, opt?: Bull.JobOptions) {
    void this.queue.add(EMAIL_MESSAGE, data, opt);
  }

  private start() {
    EventEmitter.once('start', () => {
      void this.queue.process(
        EMAIL_MESSAGE,
        async (job: Bull.Job<EmailMessage>) => {
          try {
            await this.emailService.sendEmail(job.data);

            await job.progress(100);

            return await Promise.resolve();
          } catch (err) {
            this.handleError(err);

            return Promise.reject(err);
          }
        },
      );
    });
  }
}
