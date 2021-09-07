import { IProfile } from './profile.interface';

export interface IUser {
  email: string;
  password: string;
  isConfirmedEmail: boolean;
  isActive: boolean;
  profile?: IProfile;
}
