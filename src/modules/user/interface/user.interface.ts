import { IProfile } from './profile.interface';

export interface IUser {
  email?: string;
  isActive: boolean;
  isConfirmedEmail: boolean;
  password?: string;
  profile?: IProfile;
  resetPasswordOTP?: string;
}
