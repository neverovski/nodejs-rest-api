import { NotificationMethod, NotificationParams } from '../notification.type';

export interface INotificationService {
  send(data: NotificationMethod, params: NotificationParams): void;
}
