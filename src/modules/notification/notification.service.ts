import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { ServiceCore } from '@core/service';
import { EmailInject, IEmailProducerJob } from '@providers/email';

import { INotificationService } from './interface';
import { NotificationMethod, NotificationParams } from './notification.type';

@Injectable()
export class NotificationService
  extends ServiceCore
  implements INotificationService
{
  constructor(
    @Inject(EmailInject.PRODUCER)
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
