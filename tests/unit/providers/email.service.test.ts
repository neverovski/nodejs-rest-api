import 'reflect-metadata';

import { Transporter, createTransport } from 'nodemailer';
import type { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

import { TemplatePath } from '@common/enums';
import { InternalServerErrorException } from '@common/exceptions';
import { TemplateUtil } from '@common/utils';
import { EmailService } from '@providers/email/email.service';
import { emailConfigMock } from '__mocks__/email.config.mock';
import { loggerMock } from '__mocks__/logger.service.mock';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn(),
  }),
}));

describe('EmailService', () => {
  let emailService: EmailService;
  let clientMock: Transporter<SentMessageInfo>;

  beforeEach(() => {
    emailService = new EmailService(emailConfigMock, loggerMock);

    clientMock = createTransport();
  });

  describe('sendEmail', () => {
    it('should send an email with the provided options', async () => {
      const options = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Text',
        html: '<p>Test HTML</p>',
      };

      await emailService.sendEmail(options);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientMock.sendMail).toHaveBeenCalledWith({
        ...options,
        from: `"${emailConfigMock.name}" <${emailConfigMock.username}>`,
      });
    });

    it('should send an email with a template if a template path is provided', async () => {
      const options = {
        to: 'test@example.com',
        templatePath: 'path-to-template' as TemplatePath,
        data: { key: 'value' },
      };

      const message = {
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        markdown: 'Test Markdown',
      };

      jest.spyOn(TemplateUtil, 'getMessage').mockResolvedValue(message);

      await emailService.sendEmail(options);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientMock.sendMail).toHaveBeenCalledWith({
        ...options,
        subject: message.subject,
        html: message.html,
        text: message.markdown,
        alternatives: [
          { contentType: 'text/x-web-markdown', content: message.markdown },
        ],
        from: `"${emailConfigMock.name}" <${emailConfigMock.username}>`,
      });
    });

    it('should throw an error if sending the email fails', async () => {
      const options = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Text',
        html: '<p>Test HTML</p>',
        templatePath: 'path-to-template' as TemplatePath,
      };

      const error = new InternalServerErrorException();

      (clientMock.sendMail as jest.Mock).mockRejectedValue(error);

      await expect(emailService.sendEmail(options)).rejects.toThrow(error);
    });
  });
});
