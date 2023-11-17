import { container } from 'tsyringe';

import { EmailInject } from './email.enum';
import { EmailService } from './email.service';
import {
  IEmailConsumerJob,
  IEmailProducerJob,
  IEmailService,
} from './interface';
import { EmailConsumerJob, EmailProducerJob } from './job';

export class EmailDi {
  static init() {
    this.registerService();
    this.registerProducer();
    this.registerConsumer();
  }

  private static registerConsumer() {
    container.registerInstance<IEmailConsumerJob>(
      EmailInject.CONSUMER,
      container.resolve(EmailConsumerJob),
    );
  }

  private static registerProducer() {
    container.registerInstance<IEmailProducerJob>(
      EmailInject.PRODUCER,
      new EmailProducerJob(),
    );
  }

  private static registerService() {
    container.registerInstance<IEmailService>(
      EmailInject.SERVICE,
      new EmailService(),
    );
  }
}
