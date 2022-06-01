import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core';
import { HttpException } from '@utils';
import { ResponseHelper, ValidateHelper } from '@utils/helpers';

import { IUserService } from './interface';
import { USER_RELATIONS } from './user.constant';
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
    try {
      return await this.repository.findOneOrFail({
        where: query,
        relations: USER_RELATIONS,
      });
    } catch (error) {
      throw this.errorHandler(error as Error, HttpException.NOT_FOUND_USER);
    }
  }

  async update(query: Partial<FullUser>, body: Partial<User>) {
    await this.repository.updateEntity(
      {
        where: query,
      },
      body,
    );
  }

  async updatePassword(
    query: Partial<FullUser>,
    { oldPassword, newPassword }: Password,
  ) {
    const user = await this.repository.findOneOrFail({ where: query });

    if (!ValidateHelper.credentials(oldPassword, user?.password)) {
      throw ResponseHelper.error(HttpException.INVALID_CREDENTIALS);
    }

    await this.repository.save({ ...user, password: newPassword });
  }
}
