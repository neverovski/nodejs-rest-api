import { container } from 'tsyringe';

import EmailQueue from './email.queue';
import EmailService from './email.service';
import { EmailInject } from './email.type';
import { IEmailQueue, IEmailService } from './interface';

container.registerSingleton<IEmailService>(
  EmailInject.EMAIL_SERVICE,
  EmailService,
);

container.registerSingleton<IEmailQueue>(EmailInject.EMAIL_QUEUE, EmailQueue);
