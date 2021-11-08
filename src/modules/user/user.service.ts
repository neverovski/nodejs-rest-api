import { compareSync } from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';
import { httpError, HttpExceptionType } from '@utils/index';

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
    try {
      await this.repository.createUser(body);
    } catch {
      throw httpError(HttpExceptionType.USER_ALREADY_TAKEN);
    }
  }

  async getOne(query: Partial<FullUser>) {
    return this.repository.findOneOrFail({ where: query });
  }

  async update(query: Id, body: Partial<User>) {
    await this.repository.updateUser(query, body);
  }

  validateCredentials(user: Pick<User, 'password'>, password: string) {
    return user.password ? compareSync(password, user.password) : false;
  }
}
