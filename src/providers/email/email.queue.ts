import Bull from 'bull';
import { container } from 'tsyringe';

import { EmailConfig } from '@config';
import { Queue } from '@lib';
import { EventEmitter, DateHelper } from '@utils/helpers';

import { EMAIL_QUEUQ, EMAIL_MESSAGE } from './email.constant';
import { EmailMessage, EmailInject } from './email.type';
import { IEmailService, IEmailQueue } from './interface';

export default class EmailQueue extends Queue implements IEmailQueue {
  private readonly emailService: IEmailService;

  constructor() {
    super(EMAIL_QUEUQ, {
      defaultJobOptions: {
        attempts: 30,
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
            const { email, subject, text, html } = job.data;

            await this.emailService.sendEmail({
              to: email,
              from: EmailConfig.username,
              subject,
              text: text || subject,
              html: html || subject,
            });

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
