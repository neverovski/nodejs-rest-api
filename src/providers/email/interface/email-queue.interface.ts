import type { JobOptions } from 'bull';

import { EmailMessage } from '../email.type';

export interface IEmailQueue {
  sendEmail(data: EmailMessage, opt?: JobOptions): void;
}
