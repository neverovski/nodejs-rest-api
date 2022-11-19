import { EmailMessage } from '../email.type';

export interface IEmailService {
  sendEmail(data: EmailMessage): Promise<void>;
}
