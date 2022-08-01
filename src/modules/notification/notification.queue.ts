import Bull from 'bull';
import { container } from 'tsyringe';

import { Queue, i18n } from '@lib';
import { EmailInject, IEmailQueue } from '@providers/email';
import { DateHelper, EventEmitter, StringHelper } from '@utils/helpers';

import { INotificationQueue } from './interface';
import {
  NOTIFICATION_FORGOT_PASSWORD,
  NOTIFICATION_QUEUQ,
} from './notification.constant';
import { ForgotPassword } from './notification.type';

export default class NotificationQueue
  extends Queue
  implements INotificationQueue
{
  private readonly emailQueue: IEmailQueue;

  constructor() {
    super(NOTIFICATION_QUEUQ, {
      defaultJobOptions: {
        attempts: 30,
        backoff: {
          type: 'exponential',
          delay: DateHelper.toMs('1s'),
        },
      },
    });

    this.emailQueue = container.resolve<IEmailQueue>(EmailInject.EMAIL_QUEUE);
    this.process();
  }

  addForgotPasswordToQueue(data: ForgotPassword, opt?: Bull.JobOptions) {
    void this.queue.add(NOTIFICATION_FORGOT_PASSWORD, data, opt);
  }

  private process() {
    EventEmitter.once('start', () => {
      void this.queue.process(
        NOTIFICATION_FORGOT_PASSWORD,
        async (job: Bull.Job<ForgotPassword>) => {
          try {
            const { email, token } = job.data;

            if (email) {
              void this.emailQueue.addSendMessageToQueue({
                email,
                subject: i18n()['email.forgotPassword'],
                html: StringHelper.replate(i18n()['email.token'], { token }),
              });
            }

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
