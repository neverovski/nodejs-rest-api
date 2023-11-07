import { inject } from 'tsyringe';

import { PlatformPayload } from '@common/types';
import { RepositoryCore } from '@core';
import { FullUser, IUserRepository, UserInject } from '@modules/user';

import { PlatformEntity } from '../entity/platform.entity';

export class PlatformRepository
  extends RepositoryCore<PlatformEntity>
  implements IPlatformRepository
{
  constructor(
    @inject(UserInject.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {
    super(PlatformEntity);
  }

  async createPlatformAndUser({
    profile,
    avatar,
    email,
    ...platform
  }: PlatformPayload): Promise<FullUser> {
    try {
      return await this.orm.manager.transaction(async (manager) => {
        const user =
          (await this.userRepository.findOne(
            { where: { email } },
            { manager },
          )) ||
          (await this.userRepository.create(
            {
              email,
              profile,
              avatar,
              isEmailConfirmed: true,
              isVerified: true,
            },
            { manager },
          ));

        await manager
          .createQueryBuilder(PlatformEntity, this.alias)
          .insert()
          .values({ ...platform, userId: user.id })
          .execute();

        return user;
      });
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
