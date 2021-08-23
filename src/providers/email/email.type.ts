import { Options } from 'nodemailer/lib/mailer';

export type SendEmail = Pick<
  Options,
  'from' | 'to' | 'subject' | 'text' | 'html'
>;

export type DeployEmail = {
  subject: string;
  text: string;
};
