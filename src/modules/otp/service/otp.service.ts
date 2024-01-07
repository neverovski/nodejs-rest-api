import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { OtpType } from '@common/enums';
import { ServiceCore } from '@core/service';
import {
  INotificationService,
  NotificationInject,
} from '@modules/notification';
import { FullUser } from '@modules/user';
import { ILoggerService, LoggerInject } from '@providers/logger';

import {
  IOtpCodeRepository,
  IOtpService,
  IOtpValidatorService,
} from '../interface';
import { OtpInject } from '../otp.enum';
import {
  FullOtpCode,
  OtpCodeQuery,
  SendCode,
  UpdateOtpCode,
  VerifyCode,
} from '../otp.type';
import { OtpUtil } from '../otp.util';

@Injectable()
export class OtpService extends ServiceCore implements IOtpService {
  constructor(
    @Inject(LoggerInject.SERVICE) protected readonly logger: ILoggerService,
    @Inject(NotificationInject.SERVICE)
    private readonly notificationService: INotificationService,
    @Inject(OtpInject.CODE_REPOSITORY)
    private readonly repository: IOtpCodeRepository,
    @Inject(OtpInject.VALIDATOR_SERVICE)
    private readonly validatorService: IOtpValidatorService,
  ) {
    super();
  }

  async createAndSendCode({ type, user }: SendCode): Promise<void> {
    await this.validatorService.checkResendCode({ type }, user);
    const otp = await this.create(type, user);

    this.sendOtpNotification(otp, user);
  }

  async verifyCode({ user, type, code }: VerifyCode): Promise<void> {
    await this.validatorService.checkCode({ type, code }, user);

    await this.update({ type, code, userId: user.id }, { isVerified: true });
  }

  protected create(type: OtpType, user: FullUser): Promise<FullOtpCode> {
    const code = OtpUtil.generateCode(type);
    const expiredAt = OtpUtil.getExpiredAt(type);

    return this.repository.create({
      code,
      expiredAt,
      type,
      userId: user.id,
    });
  }

  protected async update(
    query: OtpCodeQuery,
    data: UpdateOtpCode,
  ): Promise<void> {
    await this.repository.update(query, data);
  }

  private sendOtpNotification(otp: FullOtpCode, user: FullUser): void {
    const config = OtpUtil.getNotificationConfig(otp, user);

    if (config) {
      this.notificationService.send(...config);
    }
  }
}
