import { FullUser, UserPasswordChange, UserQuery } from '../../types/user.type';

export interface IUserValidatorService {
  checkCredentials(user?: UserQuery | null, password?: string): Promise<void>;
  checkEmailConfirmed(user?: FullUser | null): void;
  checkEmailEmpty(user?: FullUser | null): void;
  checkNewPassword(data: UserPasswordChange): void;
  checkOldPassword(user?: UserQuery | null, password?: string): Promise<void>;
}
