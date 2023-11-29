import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey } from '@common/enums';
import { IRedisConfig } from '@config';
import { ProducerCoreJob } from '@core/job';

import { EMAIL_QUEUE_NAME } from '../email.constant';
import { EmailJobName } from '../email.enum';
import { EmailMessage } from '../email.type';

@Singleton()
export class EmailProducerJob extends ProducerCoreJob {
  constructor(@Inject(ConfigKey.REDIS) redisConfig: IRedisConfig) {
    super(EMAIL_QUEUE_NAME, redisConfig);
  }

  async sendEmail(data: EmailMessage) {
    await this.addJob(EmailJobName.SEND_MESSAGE, data);
  }
}
