import { FullUser, PasswordChangeRequest } from '../user.type';

export interface IUserValidatorService {
  checkCredentials(
    user?: DeepPartial<FullUser> | null,
    password?: string,
  ): Promise<void>;
  checkNewPassword(data: PasswordChangeRequest): void;
  checkOldPassword(
    user?: DeepPartial<FullUser> | null,
    password?: string,
  ): Promise<void>;
}
