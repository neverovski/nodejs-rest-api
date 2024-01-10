import { OtpType, TemplatePath } from '@common/enums';
import { DateUtil, HashUtil } from '@common/utils';
import type {
  NotificationMethod,
  NotificationParams,
} from '@modules/notification';
import type { FullUser } from '@modules/user';

import { EXPIRED_AT_DEFAULT, EXPIRED_AT_RESET_PASSWORD } from './otp.constant';
import { FullOtpCode } from './otp.type';

export class OtpUtil {
  static generateCode(type: OtpType): string {
    switch (type) {
      case OtpType.FORGOT_PASSWORD_BY_EMAIL:
      case OtpType.VERIFY_EMAIL:
        return HashUtil.generateUuid();

      default:
        return '';
    }
  }

  static getExpiredAt(type: OtpType): Date {
    switch (type) {
      case OtpType.FORGOT_PASSWORD_BY_EMAIL:
        return DateUtil.addMillisecondToDate(
          new Date(),
          DateUtil.parseStringToMs(EXPIRED_AT_RESET_PASSWORD),
        );

      default:
        return DateUtil.addMillisecondToDate(
          new Date(),
          DateUtil.parseStringToMs(EXPIRED_AT_DEFAULT),
        );
    }
  }

  static getNotificationConfig(
    otp: FullOtpCode,
    user: FullUser,
  ): [NotificationMethod, NotificationParams] | null {
    switch (otp.type) {
      case OtpType.FORGOT_PASSWORD_BY_EMAIL: {
        return [
          { email: user.email },
          {
            templatePath: TemplatePath.FORGOT_PASSWORD_BY_EMAIL,
            data: { code: otp.code },
          },
        ];
      }

      case OtpType.VERIFY_EMAIL: {
        return [
          { email: user.email },
          {
            templatePath: TemplatePath.EMAIL_VERIFICATION,
            data: { code: otp.code },
          },
        ];
      }

      default:
        return null;
    }
  }
}
