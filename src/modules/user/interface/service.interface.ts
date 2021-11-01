import { User, FullUser } from '../user.type';

export interface IUserService {
  create(body: User): Promise<void>;
  getOne(query: Partial<FullUser>): Promise<FullUser>;
  validateCredentials(
    user: Required<Pick<User, 'password'>>,
    password: string,
  ): Promise<boolean>;
}
