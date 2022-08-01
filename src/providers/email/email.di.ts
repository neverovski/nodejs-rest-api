import { container } from 'tsyringe';

import EmailQueue from './email.queue';
import EmailService from './email.service';
import { EmailInject } from './email.type';
import { IEmailQueue, IEmailService } from './interface';

container.registerInstance<IEmailService>(
  EmailInject.EMAIL_SERVICE,
  new EmailService(),
);

container.registerInstance<IEmailQueue>(
  EmailInject.EMAIL_QUEUE,
  new EmailQueue(),
);
