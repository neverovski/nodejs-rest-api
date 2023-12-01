import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { RepositoryCtx } from '@common/types';
import { RepositoryCore } from '@core';
import { DatabaseInject, IDatabaseService } from '@database';

import { UserEntity } from '../entity/user.entity';
import { IProfileRepository, IUserRepository } from '../interface';
import {
  CreateUser,
  FullUser,
  UpdateUser,
  UserQuery,
  UserRepositoryCtx,
} from '../types';
import { UserInject } from '../user.enum';

@Singleton()
export class UserRepository
  extends RepositoryCore<UserEntity>
  implements IUserRepository
{
  constructor(
    @Inject(DatabaseInject.SERVICE) databaseService: IDatabaseService,
    @Inject(UserInject.PROFILE_REPOSITORY)
    private readonly profileRepository: IProfileRepository,
  ) {
    super(databaseService.dataSource, UserEntity);
  }

  create(
    { profile, ...entity }: CreateUser,
    ctx?: UserRepositoryCtx,
  ): Promise<FullUser> {
    return this.transactionManager(async (manager) => {
      const queryBuilder = manager
        .createQueryBuilder(UserEntity, this.alias)
        .insert()
        .values(entity);

      if (ctx?.skipEmailOnConflict) {
        queryBuilder.onConflict(
          '(email) DO UPDATE SET (email) = (EXCLUDED.email)',
        );
      }

      const userRaw = await queryBuilder
        .returning('*')
        .execute()
        .then((res) => res?.generatedMaps[0] as FullUser);

      if (profile) {
        const profileRaw = await this.profileRepository.createOrUpdate(
          { ...profile, userId: userRaw.id },
          { manager },
        );

        manager.merge(UserEntity, userRaw, { profile: profileRaw });
      }

      return Object.assign(new UserEntity(), userRaw);
    }, ctx);
  }

  async update(
    query: UserQuery,
    { profile, ...entity }: UpdateUser,
    ctx?: RepositoryCtx,
  ): Promise<void> {
    return this.transactionManager(async (manager) => {
      if (profile && query.id) {
        await this.profileRepository.createOrUpdate(
          { ...profile, userId: query.id },
          { manager },
        );
      }

      await manager.update(UserEntity, query, entity);
    }, ctx);
  }
}
