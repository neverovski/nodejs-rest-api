import { EntityManager } from 'typeorm';

import { RepositoryCtx } from '@common/types';
import { RepositoryCore } from '@core';

import { ProfileEntity } from '../entity/profile.entity';
import { UserEntity } from '../entity/user.entity';
import { IUserRepository } from '../interface';
import {
  CreateUser,
  FullProfile,
  FullUser,
  Profile,
  UpdateUser,
  UserQuery,
  UserRepositoryCtx,
} from '../user.type';

export class UserRepository
  extends RepositoryCore<UserEntity>
  implements IUserRepository
{
  constructor() {
    super(UserEntity);
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
        const profileRaw = await this.createOrUpdateProfile(
          { ...profile, userId: userRaw.id },
          { ...ctx, manager },
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
        await this.createOrUpdateProfile(
          { ...profile, userId: query.id },
          { ...ctx, manager },
        );
      }

      await manager.update(UserEntity, query, entity);
    }, ctx);
  }

  //TODO: create profile repository
  private async createOrUpdateProfile(
    entity: Partial<Profile>,
    ctx?: UserRepositoryCtx,
  ): Promise<FullProfile> {
    try {
      const manager: EntityManager = ctx?.manager || this.orm.manager;
      const keys = Object.keys(entity);

      const queryBuilder = manager
        .createQueryBuilder(ProfileEntity, this.alias)
        .insert()
        .values(entity);

      if (ctx?.skipEmailOnConflict) {
        queryBuilder.onConflict(
          '("userId") DO UPDATE SET "userId" = EXCLUDED."userId"',
        );
      } else {
        queryBuilder.orUpdate(keys, ['userId']);
      }

      return await queryBuilder
        .returning('*')
        .execute()
        .then((res) => res?.generatedMaps[0] as FullProfile);
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
