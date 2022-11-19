import type { Options } from 'nodemailer/lib/mailer';

export enum EmailInject {
  EMAIL_QUEUE = 'EmailQueue',
  EMAIL_SERVICE = 'EmailService',
}

export type EmailMessage = Options & {
  data?: Record<string, any>;
  template?: string;
};
