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
import { FullOtpCode, SendCode } from '../otp.type';
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

  create(type: OtpType, user: FullUser): Promise<FullOtpCode> {
    const code = OtpUtil.generateCode(type);
    const expiredAt = OtpUtil.getExpiredAt(type);

    return this.repository.create({
      code,
      expiredAt,
      type,
      userId: user.id,
    });
  }

  async createAndSendCode({ type, user }: SendCode): Promise<void> {
    await this.validatorService.checkResendCode(type, user);
    const otp = await this.create(type, user);

    this.sendOtpNotification(otp, user);
  }

  // async verifyCode(user: FullUser, code: string): Promise<void> {
  //   try {
  //     const otp = await this.repository.findOneOrFail({
  //       where: {
  //         code,
  //         userId: user.id,
  //         expiredAt: { min: new Date(), type: 'date-time' },
  //         isVerified: false,
  //       },
  //     });

  //     await this.repository.update({ id: otp.id }, { isVerified: true });
  //   } catch (err) {
  //     this.handleError(err);
  //     throw new BadRequestException([
  //       {
  //         key: 'code',
  //         value: i18n()['validate.code'],
  //       },
  //     ]);
  //   }
  // }

  private sendOtpNotification(otp: FullOtpCode, user: FullUser): void {
    const config = OtpUtil.getNotificationConfig(otp, user);

    if (config) {
      this.notificationService.send(...config);
    }
  }
}
