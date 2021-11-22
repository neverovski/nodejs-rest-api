import { compareSync } from 'bcrypt';
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

  async create(body: User) {
    await this.repository.createUser(body);
  }

  async getOne(query: Partial<FullUser>) {
    return this.repository.findOneOrFail({ where: query });
  }

  async update(query: Partial<FullUser>, body: Partial<User>) {
    await this.repository.updateUser(query, body);
  }

  validateCredentials(user: Pick<User, 'password'>, password: string) {
    return user.password ? compareSync(password, user.password) : false;
  }
}
