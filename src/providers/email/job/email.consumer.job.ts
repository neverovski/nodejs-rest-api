import type { Job } from 'bull';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey } from '@common/enums';
import { IRedisConfig } from '@config';
import { ConsumerCoreJob } from '@core/job';

import { EMAIL_QUEUE_NAME } from '../email.constant';
import { EmailInject, EmailJobName } from '../email.enum';
import { EmailMessage } from '../email.type';
import { IEmailConsumerJob, IEmailService } from '../interface';

@Singleton()
export class EmailConsumerJob
  extends ConsumerCoreJob
  implements IEmailConsumerJob
{
  constructor(
    @Inject(ConfigKey.REDIS) redisConfig: IRedisConfig,
    @Inject(EmailInject.SERVICE) private readonly emailService: IEmailService,
  ) {
    super(EMAIL_QUEUE_NAME, redisConfig);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.registerJobHandler(EmailJobName.SEND_MESSAGE, this.sendEmailJob);
  }

  async sendEmailJob(job: Job<EmailMessage>) {
    await this.emailService.sendEmail(job.data);
  }
}
