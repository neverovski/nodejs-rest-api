import { Notification } from '../notification.type';

export interface INotificationService {
  addToQueue(params: Notification): void;
}
