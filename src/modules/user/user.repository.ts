import { hash } from 'bcrypt';
import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core/index';

import { UserEntity, ProfileEntity } from './entity';
import { User, FullUser } from './user.type';

@EntityRepository(UserEntity)
export default class UserRepository extends RepositoryCore<UserEntity> {
  async createUser(body: User): Promise<UserEntity> {
    return this.manager.transaction(async (transaction) => {
      const { password, profile, ...data } = body;
      const user = this.create(data);

      if (password) {
        user.password = await hash(password, 10);
      }

      await transaction.save(user);

      if (profile) {
        await transaction.save(
          new ProfileEntity({ ...profile, userId: user.id }),
        );
      }

      return user;
    });
  }

  async findOneUserOrFail(query: Partial<FullUser>): Promise<UserEntity> {
    return this.findOneOrFail({
      where: query,
    });
  }
}
