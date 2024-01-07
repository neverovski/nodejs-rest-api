import { inject as Inject, injectable as Injectable } from 'tsyringe';
import { LessThanOrEqual } from 'typeorm';

import { OtpType } from '@common/enums';
import { UnprocessableEntityException } from '@common/exceptions';
import { DateUtil } from '@common/utils';
import { i18n } from '@i18n';
import type { FullUser } from '@modules/user';

import { IOtpCodeRepository, IOtpValidatorService } from '../interface';
import { DELAY_FOR_RESEND } from '../otp.constant';
import { OtpInject } from '../otp.enum';

@Injectable()
export class OtpValidatorService implements IOtpValidatorService {
  constructor(
    @Inject(OtpInject.CODE_REPOSITORY)
    private readonly repository: IOtpCodeRepository,
  ) {}

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
      throw new UnprocessableEntityException([
        { key: 'code', value: i18n()['validate.otp.delay'] },
      ]);
    }
  }

  private calculateResendTime(): Date {
    return DateUtil.addMillisecondToDate(
      new Date(),
      DateUtil.parseStringToMs(DELAY_FOR_RESEND),
    );
  }
}
