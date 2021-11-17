import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core/index';

import { UserEntity } from './entity';
import { User, FullUser } from './user.type';

@EntityRepository(UserEntity)
export default class UserRepository extends RepositoryCore<UserEntity> {
  //FIXME:
  async createUser(body: User): Promise<UserEntity> {
    try {
      const user = this.create(body);

      await this.save(user);

      return user;
    } catch (err) {
      throw this.errorHandler(err);
    }
  }

  async updateUser(
    query: Partial<FullUser>,
    body: Partial<User>,
  ): Promise<UserEntity> {
    try {
      const user = await this.findOneOrFail({
        where: query,
        relations: ['profile'],
      });

      this.merge(user, body);
      await this.save(user);

      return user;
    } catch (err) {
      throw this.errorHandler(err);
    }
  }
}
