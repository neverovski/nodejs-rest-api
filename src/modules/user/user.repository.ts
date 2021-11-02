import { hash } from 'bcrypt';
import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core/index';
import { SALT_PASSWORD_ROUNDS } from '@utils/index';

import { UserEntity } from './entity';
import { User, FullUser } from './user.type';

@EntityRepository(UserEntity)
export default class UserRepository extends RepositoryCore<UserEntity> {
  async createUser(body: User): Promise<UserEntity> {
    return this.manager.transaction(async (transaction) => {
      const { password, ...data } = body;
      const user = this.create(data);

      if (password) {
        user.password = await hash(password, SALT_PASSWORD_ROUNDS);
      }

      await transaction.save(user);

      return user;
    });
  }

  async findOneUserOrFail(query: Partial<FullUser>): Promise<UserEntity> {
    return this.findOneOrFail({
      where: query,
    });
  }

  async updateUser(
    query: Partial<FullUser>,
    body: Partial<User>,
  ): Promise<UserEntity> {
    const { password, ...user } = body;
    const userFromDB = await this.findOneOrFail({
      where: query,
      relations: ['profile'],
    });

    this.merge(userFromDB, user);
    if (password) {
      userFromDB.password = await hash(password, SALT_PASSWORD_ROUNDS);
    }

    await this.save(userFromDB);

    return userFromDB;
  }
}
