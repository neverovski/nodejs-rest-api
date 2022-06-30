import { RepositoryCore } from '@core';
import { i18n } from '@lib';

import { UserEntity } from './entity';
import { IUserRepository } from './interface';
import { User, UserOption, FullUser } from './user.type';

export default class UserRepository
  extends RepositoryCore<UserEntity>
  implements IUserRepository
{
  constructor() {
    super(UserEntity, 'u');

    this.notFound = i18n()['notFound.user'];
  }

  async create(body: User): Promise<Id> {
    try {
      const userEntity = this.orm.create(body);

      await this.orm.save(userEntity);

      return { id: userEntity.id };
    } catch (err) {
      throw this.errorHandler(err);
    }
  }

  async findOne(options: UserOption): Promise<FullUser | null> {
    try {
      return await this.orm.findOne(options);
    } catch (err) {
      throw this.errorHandler(err);
    }
  }

  async findOneOrFail(options: UserOption): Promise<FullUser> {
    try {
      return await this.orm.findOneOrFail(options);
    } catch (err) {
      throw this.errorHandler(err);
    }
  }

  async update(entity: UserEntity, body: Partial<User>): Promise<void> {
    try {
      this.orm.merge(entity, body);
      await this.orm.save(entity);
    } catch (err) {
      throw this.errorHandler(err);
    }
  }
}
