import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { EmailConfig } from '@config/index';

import { SendEmail } from './email.type';

class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = createTransport({
      host: EmailConfig.host,
      port: EmailConfig.port,
      secure: EmailConfig.port === 465, // upgrade later with STARTTLS
      auth: {
        user: EmailConfig.username,
        pass: EmailConfig.password,
      },
    });
  }

  async sendEmail(data: SendEmail): Promise<any> {
    // send mail with defined transport object
    return this.transporter.sendMail(data);
  }
}

export default new EmailService();
