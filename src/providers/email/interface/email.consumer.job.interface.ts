import type { Job } from 'bull';

import { EmailMessage } from '../email.type';

export interface IEmailConsumerJob {
  sendEmailJob(job: Job<EmailMessage>): Promise<void>;
}
