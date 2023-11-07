import { Context, FindOption, RepositoryCtx } from '@common/types';

import { IProfile, IUser } from './interface';

export type Profile = IProfile;
export type FullProfile = IdObject & Profile & DateInfo;

export type User = IUser;
export type FullUser = IdObject & User & DateInfo;

export type CreateUser = Omit<User, 'payload' | 'createdBy' | 'updatedBy'>;
export type UpdateUser = DeepPartial<CreateUser>;

export type PasswordChangeRequest = {
  newPassword: string;
  oldPassword: string;
};

export type UserQuery = DeepPartial<Omit<FullUser, 'payload'>>;
export type UserOption = FindOption<UserQuery>;
export type UserCtx = Context<UserQuery>;

export type UserRepositoryCtx = RepositoryCtx & {
  skipEmailOnConflict?: boolean;
};
