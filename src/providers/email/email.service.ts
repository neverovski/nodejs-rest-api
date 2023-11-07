import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { LoggerCtx } from '@common/enums';
import { TemplateUtil } from '@common/utils';
import { EmailConfig, IEmailConfig } from '@config';
import { ProviderServiceCore } from '@core/service';

import { EmailMessage } from './email.type';
import { IEmailService } from './interface';

export class EmailService extends ProviderServiceCore implements IEmailService {
  private readonly client: Mail;
  private readonly emailConfig: IEmailConfig;

  constructor() {
    super(LoggerCtx.EMAIL);

    this.emailConfig = EmailConfig;
    this.client = createTransport({
      service: this.emailConfig.driver,
      auth: {
        user: this.emailConfig.username,
        pass: this.emailConfig.password,
      },
    });
  }

  async sendEmail(options: EmailMessage): Promise<void> {
    try {
      if (options.template) {
        const { subject, html, markdown } = await TemplateUtil.getMessage({
          template: options.template,
          data: options.data,
          isLayout: true,
          isHTML: true,
        });

        options.subject = options.subject ?? subject;
        options.html = html;
        options.text = markdown;

        options.alternatives = [
          { contentType: 'text/x-web-markdown', content: markdown },
        ];
      }

      await this.client.sendMail({
        ...options,
        from:
          options.from ??
          `"${this.emailConfig.name}" <${this.emailConfig.username}>`,
      });
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
