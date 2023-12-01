import { container as Container } from 'tsyringe';

import { EmailInject } from './email.enum';
import { EmailService } from './email.service';
import {
  IEmailConsumerJob,
  IEmailProducerJob,
  IEmailService,
} from './interface';
import { EmailConsumerJob, EmailProducerJob } from './job';

export class EmailDi {
  register() {
    this.registerService();
    this.registerProducer();
    this.registerConsumer();
  }

  private registerConsumer() {
    Container.registerSingleton<IEmailConsumerJob>(
      EmailInject.CONSUMER,
      EmailConsumerJob,
    );
  }

  private registerProducer() {
    Container.registerSingleton<IEmailProducerJob>(
      EmailInject.PRODUCER,
      EmailProducerJob,
    );
  }

  private registerService() {
    Container.registerSingleton<IEmailService>(
      EmailInject.SERVICE,
      EmailService,
    );
  }
}
