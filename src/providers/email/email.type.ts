import type { Options } from 'nodemailer/lib/mailer';

import { TemplateOption } from '@common/types';

export type EmailMessage = Options &
  Partial<Pick<TemplateOption, 'data' | 'templatePath'>>;
