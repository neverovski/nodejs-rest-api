import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';

import { IUserService } from './interface';
import UserRepository from './user.repository';
import { User, FullUser } from './user.type';

export default class UserService extends ServiceCore implements IUserService {
  private readonly repository: UserRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(UserRepository);
  }

  async getOne(query: Partial<FullUser>) {
    const userFromDB = await this.repository.findOneUserOrFail(query);

    return userFromDB as FullUser;
  }

  async create(body: User) {
    await this.repository.createUser(body);
  }

  async validateCredentials(
    user: Pick<User, 'password'>,
    password: string,
  ): Promise<boolean> {
    return user.password ? compare(password, user.password) : false;
  }
}
