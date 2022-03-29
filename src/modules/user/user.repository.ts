import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core';

import { UserEntity } from './entity';
import { User } from './user.type';

@EntityRepository(UserEntity)
export default class UserRepository extends RepositoryCore<UserEntity> {
  async createUser(body: User): Promise<UserEntity> {
    try {
      const user = this.create(body);

      return await this.save(user);
    } catch (err) {
      throw this.errorHandler(err);
    }
  }
}
