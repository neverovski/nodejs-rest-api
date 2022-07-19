import { container } from 'tsyringe';

import { INotificationQueue } from './interface';
import NotificationQueue from './notification.queue';
import { NotificationInject } from './notification.type';

container.registerInstance<INotificationQueue>(
  NotificationInject.NOTIFICATION_QUEUE,
  new NotificationQueue(),
);
