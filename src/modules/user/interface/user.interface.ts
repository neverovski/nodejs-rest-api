import { IProfile } from './profile.interface';

export interface IUser {
  confirmTokenPassword?: string;
  email?: string;
  isActive: boolean;
  isConfirmedEmail: boolean;
  password?: string;
  profile?: IProfile;
}
