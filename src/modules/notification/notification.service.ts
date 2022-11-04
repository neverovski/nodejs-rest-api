import { inject, injectable } from 'tsyringe';

import { ServiceCore } from '@core';
import { EmailInject, IEmailQueue } from '@providers/email';

import { INotificationService } from './interface';
import { Notification } from './notification.type';

@injectable()
export default class NotificationService
  extends ServiceCore
  implements INotificationService
{
  constructor(
    @inject(EmailInject.EMAIL_QUEUE)
    private readonly emailQueue: IEmailQueue,
  ) {
    super();
  }

  addToQueue({ email, data, template }: Notification): void {
    if (email) {
      void this.emailQueue.addSendMessageToQueue({
        to: email,
        template,
        data,
      });
    }
  }
}
