import Bull from 'bull';
import { container } from 'tsyringe';

import { Queue } from '@lib';
import { DateHelper, EventEmitter } from '@utils/helpers';

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

    this.process();
  }

  addSendMessageToQueue(data: EmailMessage, opt?: Bull.JobOptions) {
    void this.queue.add(EMAIL_MESSAGE, data, opt);
  }

  private process() {
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
