import type { Options } from 'nodemailer/lib/mailer';

import { TemplatePath } from '@common/enums';

export type EmailMessage = Options & {
  data?: Record<string, any>;
  templatePath?: TemplatePath;
};
