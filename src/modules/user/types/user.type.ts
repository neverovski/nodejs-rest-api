import type { Request as ExpressRequest } from 'express';

import { Context, FindOption, RepositoryCtx } from '@common/types';

import { IUser } from '../interface';

import { CreateProfile } from './profile.type';

export type User = IUser;
export type FullUser = IdObject & User & DateInfo;

export type CreateUser = Omit<User, 'getPayload' | 'profile'> & {
  profile?: Pick<CreateProfile, 'userId'>;
};
export type UpdateUser = DeepPartial<CreateUser>;

export type UserPasswordChange = {
  newPassword: string;
  oldPassword: string;
};

export type UserQuery = DeepPartial<FullUser>;
export type UserOption = FindOption<UserQuery>;
export type UserCtx = Context<UserQuery>;

export type UserRepositoryCtx = RepositoryCtx & {
  skipEmailOnConflict?: boolean;
};

export type UserRequest = ExpressRequest;
export type CreateUserRequest = ExpressRequest<any, any, CreateUser>;
export type UpdateUserRequest = ExpressRequest<any, any, UpdateUser>;
export type DeleteUserRequest = ExpressRequest<any, any, UserQuery>;
export type UserPasswordChangeRequest = ExpressRequest<
  any,
  any,
  UserPasswordChange
>;
