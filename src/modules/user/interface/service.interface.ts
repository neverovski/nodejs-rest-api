import { User, FullUser } from '../user.type';

export interface IUserService {
  create(body: User): Promise<void>;
  getOne(query: Partial<FullUser>): Promise<FullUser>;
  update(query: Partial<FullUser>, body: Partial<User>): Promise<void>;
  validateCredentials(
    user: Required<Pick<User, 'password'>>,
    password: string,
  ): boolean;
}
