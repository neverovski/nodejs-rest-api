import { HashUtil } from '@common/utils';
import { ValidatorServiceCore } from '@core/service';

import { IUserValidatorService } from '../interface';
import { FullUser, UserPasswordChange } from '../types';

export class UserValidatorService
  extends ValidatorServiceCore
  implements IUserValidatorService
{
  async checkCredentials(
    user?: DeepPartial<FullUser> | null,
    password?: string,
  ) {
    const isValid = await HashUtil.isComparePassword(password, user?.password);

    if (!isValid) {
      this.throwException('invalidCredentials', 'validate.invalidCredentials');
    }
  }

  checkEmailConfirmed(user?: FullUser | null) {
    if (user?.isEmailConfirmed) {
      this.throwException('user', 'validate.email.confirmed');
    }
  }

  checkEmailEmpty(user?: FullUser | null) {
    if (!user || !user.email) {
      this.throwException('user', 'validate.email.empty');
    }
  }

  checkNewPassword(data: UserPasswordChange) {
    if (data.newPassword === data.oldPassword) {
      this.throwException(
        'newPassword',
        'validate.newPassword.equalOldPassword',
      );
    }
  }

  async checkOldPassword(user?: Partial<FullUser> | null, password?: string) {
    const isValid = await HashUtil.isComparePassword(password, user?.password);

    if (!isValid) {
      this.throwException('oldPassword', 'validate.oldPassword.notCorrect');
    }
  }
}
