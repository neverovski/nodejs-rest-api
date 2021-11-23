import { IUser } from './interface';

export type User = IUser;
export type FullUser = Id & User & DateInfo;

export type UserUpdateRequest = Partial<Pick<FullUser, 'email' | 'profile'>>;
export type Password = { newPassword: string; oldPassword: string };
