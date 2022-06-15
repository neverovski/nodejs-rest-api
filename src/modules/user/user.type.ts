import { FindManyOptions } from 'typeorm';

import { IUser } from './interface';

export enum UserInject {
  USER_REPOSITORY = 'UserRepository',
  USER_SERVICE = 'UserService',
}

export type User = IUser;
export type FullUser = Id & User & DateInfo;

export type Password = { newPassword: string; oldPassword: string };

export type UserOption = Pick<
  FindManyOptions<FullUser>,
  'relations' | 'skip' | 'take' | 'order'
> & {
  where?: Partial<FullUser>;
};
