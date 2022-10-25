import type { Job, JobOptions } from 'bull';
import { container } from 'tsyringe';

import { Queue } from '@lib';
import { EmailInject, IEmailQueue } from '@providers/email';
import { EXPIRED_OTP, Template } from '@utils';
import { DateHelper, EventEmitter } from '@utils/helpers';

import { INotificationQueue } from './interface';
import {
  NOTIFICATION_PASSWORD_CHANGED,
  NOTIFICATION_PASSWORD_RESET,
  NOTIFICATION_QUEUE,
  NOTIFICATION_REGISTRATION,
  NOTIFICATION_VERIFICATION,
} from './notification.constant';
import { Notification } from './notification.type';

export default class NotificationQueue
  extends Queue
  implements INotificationQueue
{
  private readonly emailQueue: IEmailQueue;

  constructor() {
    super(NOTIFICATION_QUEUE, {
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

  addPasswordChangedToQueue(param: Notification, opt?: JobOptions): void {
    void this.queue.add(NOTIFICATION_PASSWORD_CHANGED, param, opt);
  }

  addPasswordResetToQueue(param: Notification, opt?: JobOptions): void {
    void this.queue.add(NOTIFICATION_PASSWORD_RESET, param, opt);
  }

  addRegistrationToQueue(param: Notification, opt?: JobOptions): void {
    void this.queue.add(NOTIFICATION_REGISTRATION, param, opt);
  }

  addVerificationToQueue(param: Notification, opt?: JobOptions): void {
    void this.queue.add(NOTIFICATION_VERIFICATION, param, opt);
  }

  protected process() {
    EventEmitter.once('start', () => {
      void this.queue.process(
        NOTIFICATION_PASSWORD_RESET,
        (job: Job<Notification>) => this.passwordReset(job),
      );
      void this.queue.process(NOTIFICATION_REGISTRATION, this.registration);

      void this.queue.process(
        NOTIFICATION_VERIFICATION,
        (job: Job<Notification>) => this.verification(job),
      );

      void this.queue.process(
        NOTIFICATION_PASSWORD_CHANGED,
        (job: Job<Notification>) => this.passwordChange(job),
      );
    });
  }

  private async passwordChange(job: Job<Notification>) {
    try {
      console.log('passwordChange');
      const { email, data } = job.data;

      if (email) {
        void this.emailQueue.addSendMessageToQueue({
          to: email,
          template: Template.PASSWORD_CHANGED,
          data,
        });
      }

      await job.progress(100);

      return await Promise.resolve();
    } catch (err) {
      this.handleError(err);

      return Promise.reject(err);
    }
  }

  private async passwordReset(job: Job<Notification>) {
    try {
      const { email, data } = job.data;

      if (email) {
        void this.emailQueue.addSendMessageToQueue({
          to: email,
          template: Template.PASSWORD_RESET,
          data,
        });
      }

      await job.progress(100);

      return await Promise.resolve();
    } catch (err) {
      this.handleError(err);

      return Promise.reject(err);
    }
  }

  private async registration(job: Job<Notification>) {
    try {
      const { email, data } = job.data;

      if (email) {
        void this.emailQueue.addSendMessageToQueue({
          to: email,
          template: Template.REGISTRATION,
          data,
        });
      }

      await job.progress(100);

      return await Promise.resolve();
    } catch (err) {
      this.handleError(err);

      return Promise.reject(err);
    }
  }

  private async verification(job: Job<Notification>) {
    try {
      const { email, data } = job.data;

      if (email) {
        void this.emailQueue.addSendMessageToQueue({
          to: email,
          template: Template.EMAIL_VERIFICATION,
          data: { ...data, time: EXPIRED_OTP },
        });
      }

      await job.progress(100);

      return await Promise.resolve();
    } catch (err) {
      this.handleError(err);

      return Promise.reject(err);
    }
  }
}
