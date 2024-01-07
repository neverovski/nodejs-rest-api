import { inject as Inject, injectable as Injectable } from 'tsyringe';
import { LessThanOrEqual } from 'typeorm';

import { OtpType } from '@common/enums';
import { DateUtil } from '@common/utils';
import { ValidatorServiceCore } from '@core/service';
import type { FullUser } from '@modules/user';

import { IOtpCodeRepository, IOtpValidatorService } from '../interface';
import { DELAY_FOR_RESEND } from '../otp.constant';
import { OtpInject } from '../otp.enum';

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

  async checkResendCode(type: OtpType, user: FullUser) {
    const createdAt = this.calculateResendTime();

    const otp = await this.repository.findOne({
      where: {
        type,
        userId: user.id,
        createdAt: LessThanOrEqual(createdAt),
      },
    });

    if (otp) {
      this.throwException('code', 'validate.otp.resend');
    }
  }

  private calculateResendTime(): Date {
    return DateUtil.addMillisecondToDate(
      new Date(),
      DateUtil.parseStringToMs(DELAY_FOR_RESEND),
    );
  }
}
