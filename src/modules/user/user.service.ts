import { compareSync } from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';
import { ResponseHelper, HttpExceptionType } from '@utils/index';

import { IUserService } from './interface';
import UserRepository from './user.repository';
import { User, FullUser, Password } from './user.type';

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

  async updatePassword(query: Partial<FullUser>, body: Password) {
    const { oldPassword, newPassword } = body;
    const user = await this.repository.findOneOrFail({ where: query });

    if (!this.validateCredentials(user, oldPassword)) {
      throw ResponseHelper.error(HttpExceptionType.INVALID_CREDENTIALS);
    }

    await this.repository.updateUser(query, { password: newPassword });
  }

  validateCredentials(user: Pick<User, 'password'>, password: string) {
    return user.password ? compareSync(password, user.password) : false;
  }
}
