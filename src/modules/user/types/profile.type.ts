import { IProfile } from '../interface';

export type Profile = IProfile;
export type FullProfile = IdObject & Profile & DateInfo;

export type CreateProfile = Omit<Profile, 'user'>;
export type UpdateProfile = Partial<CreateProfile>;
