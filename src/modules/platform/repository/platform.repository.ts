import { inject } from 'tsyringe';

import { PlatformPayload, RepositoryCtx } from '@common/types';
import { RepositoryCore } from '@core';
import { DatabaseInject, IDatabaseService } from '@database';
import {
  CreateUser,
  FullUser,
  IUserRepository,
  UserInject,
} from '@modules/user';

import { PlatformEntity } from '../entity/platform.entity';
import { IPlatformRepository } from '../interface';

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

  async createByPayload({
    profile,
    email,
    ...platform
  }: PlatformPayload): Promise<FullUser> {
    try {
      return await this.repository.manager.transaction(async (manager) => {
        let user = await this.userRepository.findOne(
          { where: { email } },
          { manager },
        );

        if (!user) {
          user = await this.createUser({
            profile: profile as CreateUser['profile'],
            email,
          });
        }

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

  private createUser(data?: CreateUser, ctx?: RepositoryCtx) {
    const manager = ctx?.manager || this.repository.manager;

    return this.userRepository.create(
      { ...data, isEmailConfirmed: true },
      { manager },
    );
  }
}
