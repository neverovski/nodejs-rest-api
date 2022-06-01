import { User, FullUser, Password } from '../user.type';

export interface IUserService {
  create(body: User): Promise<void>;
  getOne(query: Partial<FullUser>): Promise<FullUser>;
  update(query: Partial<FullUser>, body: Partial<User>): Promise<void>;
  updatePassword(query: Partial<FullUser>, body: Password): Promise<void>;
}
