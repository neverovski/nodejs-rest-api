import type { JobOptions } from 'bull';

import { ForgotPassword } from '../notification.type';

export interface INotificationQueue {
  addForgotPasswordToQueue(data: ForgotPassword, opt?: JobOptions): void;
}
