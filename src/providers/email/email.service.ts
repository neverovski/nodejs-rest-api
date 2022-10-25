import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { EmailConfig } from '@config';
import { ServiceCore } from '@core';
import { HttpException } from '@utils';
import { ExceptionHelper, TemplateHelper } from '@utils/helpers';

import { EmailMessage } from './email.type';
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

  async sendEmail(options: EmailMessage): Promise<void> {
    try {
      if (options.template) {
        const { subject, html, markdown } = await TemplateHelper.getMessage({
          template: options.template,
          data: options.data,
          isLayout: true,
          isHTML: true,
        });

        options.subject = options.subject ?? subject;
        options.html = html;
        options.text = markdown;

        options.alternatives = [
          {
            contentType: 'text/x-web-markdown',
            content: markdown,
          },
        ];
      }

      await this.transporter.sendMail({
        ...options,
        from: options.from ?? `"${EmailConfig.name}" <${EmailConfig.username}>`,
      });
    } catch (err) {
      this.handleError(err);
      throw ExceptionHelper.getError(HttpException.EXTERNAL);
    }
  }
}
