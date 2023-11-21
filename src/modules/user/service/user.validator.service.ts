import { UnprocessableEntityException } from '@common/exceptions';
import { HashUtil } from '@common/utils';
import { i18n } from '@i18n';

import { IUserValidatorService } from '../interface';
import { FullUser, UserPasswordChange } from '../types';

export class UserValidatorService implements IUserValidatorService {
  async checkCredentials(
    user?: DeepPartial<FullUser> | null,
    password?: string,
  ) {
    const isValid = await HashUtil.isComparePassword(password, user?.password);

    if (!isValid) {
      throw new UnprocessableEntityException([
        {
          key: 'invalidCredentials',
          value: i18n()['validate.invalidCredentials'],
        },
      ]);
    }
  }

  checkNewPassword(data: UserPasswordChange) {
    if (data.newPassword === data.oldPassword) {
      throw new UnprocessableEntityException([
        {
          key: 'newPassword',
          value: i18n()['validate.newPassword.equalOldPassword'],
        },
      ]);
    }
  }

  async checkOldPassword(user?: Partial<FullUser> | null, password?: string) {
    const isValid = await HashUtil.isComparePassword(password, user?.password);

    if (!isValid) {
      throw new UnprocessableEntityException([
        {
          key: 'oldPassword',
          value: i18n()['validate.oldPassword.notCorrect'],
        },
      ]);
    }
  }
}