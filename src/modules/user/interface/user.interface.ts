import { Role } from '@common/enums';
import { IBase } from '@common/interfaces';

import { Profile } from '../types';

export interface IUser extends IBase {
  email?: Email;
  isEmailConfirmed?: boolean;
  password?: Password;
  profile?: Profile;
  role?: Role;

  getPayload(): UserPayload;
}
