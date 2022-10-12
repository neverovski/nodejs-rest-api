import { IProfile } from './profile.interface';

export interface IUser {
  email?: string;
  emailOTP?: string;
  isActive: boolean;
  isConfirmedEmail: boolean;
  password?: string;
  profile?: IProfile;
}
