import type { Options } from 'nodemailer/lib/mailer';

import { TemplateType } from '@common/enums';

export type EmailMessage = Options & {
  data?: Record<string, any>;
  template?: TemplateType;
};
