import {
  CreateUser,
  FullUser,
  UpdateUser,
  UserCtx,
  UserPasswordChange,
  UserQuery,
} from '../../types/user.type';

export interface IUserService {
  count(query: UserQuery, ctx?: UserCtx): Promise<number>;
  create(data: CreateUser): Promise<FullUser>;
  delete(query: UserQuery, ctx?: UserCtx): Promise<void>;
  getList(query: UserQuery, ctx?: UserCtx): Promise<FullUser[]>;
  getOne(query: UserQuery, ctx?: UserCtx): Promise<FullUser | null>;
  getOneWithException(query: UserQuery, ctx?: UserCtx): Promise<FullUser>;
  update(query: UserQuery, data: UpdateUser, ctx?: UserCtx): Promise<FullUser>;
  updatePassword(query: UserQuery, data: UserPasswordChange): Promise<void>;
}
