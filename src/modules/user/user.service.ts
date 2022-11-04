import { inject, injectable } from 'tsyringe';

import { ServiceCore } from '@core';
import { ValidateHelper } from '@helpers';
import { Exception, HttpCode } from '@lib';

import { IUserRepository, IUserService } from './interface';
import { USER_RELATION } from './user.constant';
import { FullUser, Password, User, UserInject } from './user.type';

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

  async delete({ id }: Pick<FullUser, 'id'>) {
    await this.repository.findOneOrFail({
      where: { id },
    });
    await this.repository.delete({ id });
  }

  getOne(query: Partial<FullUser>) {
    return this.repository.findOne({
      where: query,
      relations: USER_RELATION,
    });
  }

  getOneOrFail(query: Partial<FullUser>) {
    return this.repository.findOneOrFail({
      where: query,
      relations: USER_RELATION,
    });
  }

  async update(query: Partial<FullUser>, body: Partial<User>) {
    const entity = await this.repository.findOneOrFail({
      where: query,
      relations: USER_RELATION,
    });

    await this.repository.update(entity, body);

    return { id: entity.id };
  }

  async updatePassword(
    query: Partial<FullUser>,
    { oldPassword, newPassword }: Password,
  ) {
    const { id, password } = await this.repository.findOneOrFail({
      where: query,
    });

    if (!ValidateHelper.credentials(oldPassword, password)) {
      throw Exception.getError(HttpCode.INVALID_CREDENTIALS);
    }

    await this.repository.update({ id }, { password: newPassword });
  }
}
