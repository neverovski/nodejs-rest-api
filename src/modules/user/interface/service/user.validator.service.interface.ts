import { UserPasswordChange, UserQuery } from '../../types/user.type';

export interface IUserValidatorService {
  checkCredentials(user?: UserQuery | null, password?: string): Promise<void>;
  checkNewPassword(data: UserPasswordChange): void;
  checkOldPassword(user?: UserQuery | null, password?: string): Promise<void>;
}
