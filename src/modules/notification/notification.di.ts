import { container } from 'tsyringe';

import { INotificationService } from './interface';
import NotificationService from './notification.service';
import { NotificationInject } from './notification.type';

container.register<INotificationService>(
  NotificationInject.NOTIFICATION_SERVICE,
  NotificationService,
);
