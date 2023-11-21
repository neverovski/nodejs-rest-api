import { inject } from 'tsyringe';

import { ServiceCore } from '@core/service';
import { EmailInject, IEmailProducerJob } from '@providers/email';

import { INotificationService } from './interface';
import { NotificationMethod, NotificationParams } from './notification.type';

export class NotificationService
  extends ServiceCore
  implements INotificationService
{
  constructor(
    @inject(EmailInject.PRODUCER)
    private readonly emailProducerJob: IEmailProducerJob,
  ) {
    super();
  }

  send({ email }: NotificationMethod, params: NotificationParams): void {
    if (email) {
      void this.emailProducerJob.sendEmail({
        to: email,
        ...params,
      });
    }
  }
}
