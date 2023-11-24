import type { Job } from 'bull';
import { inject } from 'tsyringe';

import { ConsumerCoreJob } from '@core/job';

import { EMAIL_QUEUE_NAME } from '../email.constant';
import { EmailInject, EmailJobName } from '../email.enum';
import { EmailMessage } from '../email.type';
import { IEmailConsumerJob, IEmailService } from '../interface';

export class EmailConsumerJob
  extends ConsumerCoreJob
  implements IEmailConsumerJob
{
  constructor(
    @inject(EmailInject.SERVICE) private emailService: IEmailService,
  ) {
    super(EMAIL_QUEUE_NAME);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.registerJobHandler(EmailJobName.SEND_MESSAGE, this.sendEmailJob);
  }

  async sendEmailJob(job: Job<EmailMessage>) {
    await this.emailService.sendEmail(job.data);
  }
}
