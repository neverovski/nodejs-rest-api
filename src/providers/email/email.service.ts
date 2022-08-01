import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { EmailConfig } from '@config';
import { ServiceCore } from '@core';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { SendEmail } from './email.type';
import { IEmailService } from './interface';

export default class EmailService extends ServiceCore implements IEmailService {
  private transporter: Mail;

  constructor() {
    super();

    this.transporter = createTransport({
      host: EmailConfig.host,
      port: EmailConfig.port,
      secure: EmailConfig.port === 465, // upgrade later with STARTTLS
      auth: {
        user: EmailConfig.username,
        pass: EmailConfig.password,
      },
    });

    this.init();
  }

  async sendEmail<T>(data: SendEmail): Promise<T> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await this.transporter.sendMail(data);
    } catch (err) {
      this.handleError(err);
      throw ResponseHelper.error(HttpException.EXTERNAL);
    }
  }
}
