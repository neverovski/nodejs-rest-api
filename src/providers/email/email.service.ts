import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey } from '@common/enums';
import { TemplateUtil } from '@common/utils';
import { IEmailConfig } from '@config';
import { ProviderServiceCore } from '@core/service';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { EmailMessage } from './email.type';
import { IEmailService } from './interface';

@Singleton()
export class EmailService extends ProviderServiceCore implements IEmailService {
  private readonly client: Mail;

  constructor(
    @Inject(ConfigKey.EMAIL) private readonly emailConfig: IEmailConfig,
    @Inject(LoggerInject.SERVICE) protected readonly logger: ILoggerService,
  ) {
    super();

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
      if (options?.templatePath) {
        const { subject, html, markdown } = await TemplateUtil.getMessage({
          templatePath: options.templatePath,
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
