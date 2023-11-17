import { Role } from '@common/enums';
import { IBase } from '@common/interfaces';

import { Profile } from '../types';

export interface IUser extends IBase {
  email?: string;
  isEmailConfirmed?: boolean;
  password?: string;
  profile?: Profile;
  role?: Role;

  getPayload(): UserPayload;
}
