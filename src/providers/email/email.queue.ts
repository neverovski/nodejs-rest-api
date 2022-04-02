/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Bull from 'bull';
import ms from 'ms';

import { EmailConfig } from '@config';
import { Logger, Queue } from '@lib';
import { LoggerType } from '@utils';
import { EventEmitter } from '@utils/helpers';

import { EMAIL_QUEUQ, EMAIL_FORGOT_PASSWORD } from './email.constant';
import EmailService from './email.service';
import { ForgotPassword } from './email.type';

class EmailQueue extends Queue {
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
          } catch (error) {
            Logger.error({
              message: `${EMAIL_QUEUQ} ${EMAIL_FORGOT_PASSWORD}`,
              error,
              type: LoggerType.QUEUE,
            });

            return Promise.reject(error);
          }
        },
      );
    });
  }
}

export default new EmailQueue();
