import { container } from 'tsyringe';

import { ServiceCore } from '@core';
import { EmailInject, IEmailQueue } from '@providers/email';

import { INotificationService } from './interface';
import { Notification } from './notification.type';

export default class NotificationService
  extends ServiceCore
  implements INotificationService
{
  constructor() {
    super();

    this.init();
  }

  private get emailQueue() {
    return container.resolve<IEmailQueue>(EmailInject.EMAIL_QUEUE);
  }

  addToQueue({ email, data, template }: Notification): void {
    if (email) {
      void this.emailQueue.sendEmail({
        to: email,
        template,
        data,
      });
    }
  }
}
