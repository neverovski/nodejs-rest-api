import { injectable, inject } from 'tsyringe';

import { ServiceCore } from '@core';
import { HttpException } from '@utils';
import { ResponseHelper, ValidateHelper } from '@utils/helpers';

import { IUserService, IUserRepository } from './interface';
import { USER_RELATION } from './user.constant';
import { User, FullUser, Password, UserInject } from './user.type';

@injectable()
export default class UserService extends ServiceCore implements IUserService {
  constructor(
    @inject(UserInject.USER_REPOSITORY)
    private readonly repository: IUserRepository,
  ) {
    super();
  }

  create(body: User) {
    return this.repository.create(body);
  }

  getOne(query: Partial<FullUser>) {
    return this.repository.findOneOrFail({
      where: query,
      relations: USER_RELATION,
    });
  }

  async update(query: Partial<FullUser>, body: Partial<User>) {
    const userFromDB = await this.repository.findOneOrFail({
      where: query,
      relations: USER_RELATION,
    });

    await this.repository.update(userFromDB, body);

    return { id: userFromDB.id };
  }

  async updatePassword(
    query: Partial<FullUser>,
    { oldPassword, newPassword }: Password,
  ) {
    const { id, password } = await this.repository.findOneOrFail({
      where: query,
    });

    if (!ValidateHelper.credentials(oldPassword, password)) {
      throw ResponseHelper.error(HttpException.INVALID_CREDENTIALS);
    }

    await this.repository.update({ id }, { password: newPassword });
  }
}
