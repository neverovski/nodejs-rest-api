import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { INotificationService } from './interface';
import { NotificationInject } from './notification.enum';
import { NotificationService } from './notification.service';

export class NotificationDi extends DiCore {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.register<INotificationService>(
      NotificationInject.SERVICE,
      NotificationService,
    );
  }
}
