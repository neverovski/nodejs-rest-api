import type { JobOptions } from 'bull';

import { ForgotPassword } from '../email.type';

export interface IEmailQueue {
  addForgotPasswordToQueue(data: ForgotPassword, opt?: JobOptions): void;
}
