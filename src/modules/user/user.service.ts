import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';
import { responseOk, HttpExceptionType } from '@utils/index';

import { IUserService } from './interface';
import UserRepository from './user.repository';
import { User } from './user.type';

export default class UserService extends ServiceCore implements IUserService {
  private readonly repository: UserRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(UserRepository);
  }

  async create(body: User) {
    await this.repository.createUser(body);

    return responseOk(HttpExceptionType.USER_CREATED);
  }
}
