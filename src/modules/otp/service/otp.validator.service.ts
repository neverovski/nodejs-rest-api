import { inject as Inject, injectable as Injectable } from 'tsyringe';
import { MoreThanOrEqual } from 'typeorm';

import { SortBy } from '@common/enums';
import { DateUtil } from '@common/utils';
import { ValidatorServiceCore } from '@core/service';
import type { FullUser } from '@modules/user';

import { IOtpCodeRepository, IOtpValidatorService } from '../interface';
import { DELAY_FOR_RESEND } from '../otp.constant';
import { OtpInject } from '../otp.enum';
import { OtpCodeQuery } from '../otp.type';

@Injectable()
export class OtpValidatorService
  extends ValidatorServiceCore
  implements IOtpValidatorService
{
  constructor(
    @Inject(OtpInject.CODE_REPOSITORY)
    private readonly repository: IOtpCodeRepository,
  ) {
    super();
  }

  async checkCode(query: OtpCodeQuery, user: FullUser) {
    const otp = await this.repository.findOne({
      where: {
        ...query,
        userId: user.id,
        expiredAt: MoreThanOrEqual(new Date()),
        isVerified: false,
      },
    });

    if (!otp) {
      this.throwException('code', 'validate.code');
    }
  }

  async checkResendCode(query: OtpCodeQuery, user: FullUser) {
    const createdAt = this.calculateResendTime();

    const otp = await this.repository.findOne({
      where: {
        ...query,
        userId: user.id,
        createdAt: MoreThanOrEqual(createdAt),
      },
      order: { createdAt: SortBy.DESC },
    });

    if (otp) {
      this.throwException('code', 'validate.otp.delay', {
        time: DELAY_FOR_RESEND,
      });
    }
  }

  private calculateResendTime(): Date {
    return DateUtil.addMillisecondToDate(
      new Date(),
      -DateUtil.parseStringToMs(DELAY_FOR_RESEND),
    );
  }
}
