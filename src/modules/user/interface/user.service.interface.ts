import { FullUser, Password, User } from '../user.type';

export interface IUserService {
  create(body: User): Promise<Id>;
  delete(query: Pick<FullUser, 'id'>): Promise<void>;
  getOne(query: Partial<FullUser>): Promise<FullUser | null>;
  getOneOrFail(query: Partial<FullUser>): Promise<FullUser>;
  update(query: Partial<FullUser>, body: Partial<User>): Promise<Id>;
  updatePassword(query: Partial<FullUser>, body: Password): Promise<void>;
}
