import { IBase } from '@common/interfaces';

import { Profile } from '../user.type';

export interface IUser extends IBase {
  email?: string | null;
  isEmailConfirmed?: boolean;
  password?: string | null;
  payload: UserPayload;
  profile?: Profile;
}
