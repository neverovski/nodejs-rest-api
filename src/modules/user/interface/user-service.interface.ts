import { User, FullUser } from '../user.type';

export interface IUserService {
  getOne(query: Partial<FullUser>): Promise<FullUser>;
  create(body: User): Promise<void>;
  validateCredentials(
    user: Required<Pick<User, 'password'>>,
    password: string,
  ): Promise<boolean>;
}
