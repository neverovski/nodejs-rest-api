import { ProducerCoreJob } from '@core/job';

import { EMAIL_QUEUE_NAME } from '../email.constant';
import { EmailJobName } from '../email.enum';
import { EmailMessage } from '../email.type';

export class EmailProducerJob extends ProducerCoreJob {
  constructor() {
    super(EMAIL_QUEUE_NAME);
  }

  async sendEmail(data: EmailMessage) {
    await this.addJob(EmailJobName.SEND_MESSAGE, data);
  }
}
