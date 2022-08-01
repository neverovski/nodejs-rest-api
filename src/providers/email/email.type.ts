import { Options } from 'nodemailer/lib/mailer';

export enum EmailInject {
  EMAIL_QUEUE = 'EmailQueue',
  EMAIL_SERVICE = 'EmailService',
}

export type SendEmail = Pick<
  Options,
  'from' | 'to' | 'subject' | 'text' | 'html'
>;

export type EmailMessage = {
  email: string;
  html?: string;
  subject: string;
  text?: string;
};
