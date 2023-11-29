import { container as Container } from 'tsyringe';

import { INotificationService } from './interface';
import { NotificationInject } from './notification.enum';
import { NotificationService } from './notification.service';

export class NotificationDi {
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
