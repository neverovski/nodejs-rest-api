import { SendEmail } from '../email.type';

export interface IEmailService {
  sendEmail<T>(data: SendEmail): Promise<T>;
}
