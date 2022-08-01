import type { JobOptions } from 'bull';

import { EmailMessage } from '../email.type';

export interface IEmailQueue {
  addSendMessageToQueue(data: EmailMessage, opt?: JobOptions): void;
}
