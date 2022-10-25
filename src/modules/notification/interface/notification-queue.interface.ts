import type { JobOptions } from 'bull';

import { Notification } from '../notification.type';

export interface INotificationQueue {
  addPasswordChangedToQueue(param: Notification, opt?: JobOptions): void;
  addPasswordResetToQueue(param: Notification, opt?: JobOptions): void;
  addRegistrationToQueue(param: Notification, opt?: JobOptions): void;
  addVerificationToQueue(param: Notification, opt?: JobOptions): void;
}
