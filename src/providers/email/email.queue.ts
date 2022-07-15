import Bull from 'bull';
import ms from 'ms';
import { singleton, inject } from 'tsyringe';

import { EmailConfig } from '@config';
import { Queue } from '@lib';
import { EventEmitter } from '@utils/helpers';

import { EMAIL_QUEUQ, EMAIL_FORGOT_PASSWORD } from './email.constant';
import { ForgotPassword, EmailInject } from './email.type';
import { IEmailService } from './interface';

@singleton()
export default class EmailQueue extends Queue {
  constructor(
    @inject(EmailInject.EMAIL_SERVICE)
    private readonly emailService: IEmailService,
  ) {
    super(EMAIL_QUEUQ, {
      defaultJobOptions: {
        attempts: 30,
        backoff: {
          type: 'exponential',
          delay: ms('1s'),
        },
      },
    });

    this.process();
  }

  addForgotPasswordToQueue(data: ForgotPassword, opt?: Bull.JobOptions) {
    void this.queue.add(EMAIL_FORGOT_PASSWORD, data, opt);
  }

  private process() {
    EventEmitter.once('start', () => {
      void this.queue.process(
        EMAIL_FORGOT_PASSWORD,
        async (job: Bull.Job<ForgotPassword>) => {
          try {
            const { email, token } = job.data;

            await this.emailService.sendEmail({
              to: email,
              from: EmailConfig.username,
              subject: 'Forgot password',
              text: 'Forgot password',
              html: `Token: ${token}`,
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
