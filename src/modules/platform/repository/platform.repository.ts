import { inject } from 'tsyringe';

import { PlatformPayload } from '@common/types';
import { RepositoryCore } from '@core';
import { DatabaseInject, IDatabaseService } from '@database';
import { FullUser, IUserRepository, UserInject } from '@modules/user';

import { PlatformEntity } from '../entity/platform.entity';

export class PlatformRepository
  extends RepositoryCore<PlatformEntity>
  implements IPlatformRepository
{
  constructor(
    @inject(DatabaseInject.SERVICE)
    databaseService: IDatabaseService,
    @inject(UserInject.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {
    super(databaseService.dataSource, PlatformEntity);
  }

  async createPlatformAndUser({
    profile,
    avatar,
    email,
    ...platform
  }: PlatformPayload): Promise<FullUser> {
    try {
      return await this.repository.manager.transaction(async (manager) => {
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
