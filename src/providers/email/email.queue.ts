import Bull from 'bull';
import ms from 'ms';

import { EmailConfig } from '@config/index';
import { Logger, QueueCore } from '@core/index';
import { EventEmitter } from '@utils/index';

import { EMAIL_QUEUQ, EMAIL_FORGOT_PASSWORD } from './email.constant';
import EmailService from './email.service';
import { ForgotPassword } from './email.type';

class EmailQueue extends QueueCore {
  constructor() {
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

            await EmailService.sendEmail({
              to: email,
              from: EmailConfig.username,
              subject: 'Forgot password',
              text: 'Forgot password',
              html: `Token: ${token}`,
            });

            await job.progress(100);

            return await Promise.resolve();
          } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Logger.error(`${EMAIL_QUEUQ} ${EMAIL_FORGOT_PASSWORD}`, err);

            return Promise.reject(err);
          }
        },
      );
    });
  }
}

export default new EmailQueue();
