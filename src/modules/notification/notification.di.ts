import { container } from 'tsyringe';

import { INotificationService } from './interface';
import { NotificationInject } from './notification.enum';
import { NotificationService } from './notification.service';

export class NotificationDi {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.register<INotificationService>(
      NotificationInject.SERVICE,
      NotificationService,
    );
  }
}
