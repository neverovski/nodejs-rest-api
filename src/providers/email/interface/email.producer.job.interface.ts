import { EmailMessage } from '../email.type';

export interface IEmailProducerJob {
  sendEmail(data: EmailMessage): Promise<void>;
}
