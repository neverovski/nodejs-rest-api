import { FindManyOptions } from 'typeorm';

import { IUser } from './interface';

export enum UserInject {
  USER_REPOSITORY = 'UserRepository',
  USER_SERVICE = 'UserService',
}

export type User = IUser;
export type UserPayload = Partial<
  Pick<User, 'email' | 'isConfirmedEmail'> & {
    firstName: string;
    lastName: string;
  }
>;
export type FullUser = Id & User & { payload: UserPayload } & DateInfo;

export type Password = { newPassword: string; oldPassword: string };

export type UserOption = Pick<FindManyOptions<FullUser>, 'where' | 'relations'>;
