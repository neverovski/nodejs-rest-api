import { inject } from 'tsyringe';
import { EntityManager } from 'typeorm';

import { RepositoryCore } from '@core';
import { DatabaseInject, IDatabaseService } from '@database';

import { ProfileEntity } from '../entity/profile.entity';
import { IProfileRepository } from '../interface';
import { CreateProfile, FullProfile, UserRepositoryCtx } from '../types';

export class ProfileRepository
  extends RepositoryCore<ProfileEntity>
  implements IProfileRepository
{
  constructor(
    @inject(DatabaseInject.SERVICE) databaseService: IDatabaseService,
  ) {
    super(databaseService.dataSource, ProfileEntity);
  }

  async createOrUpdate(
    entity: CreateProfile,
    ctx?: UserRepositoryCtx,
  ): Promise<FullProfile> {
    try {
      const manager: EntityManager = ctx?.manager || this.repository.manager;
      const keys = Object.keys(entity);

      return await manager
        .createQueryBuilder(ProfileEntity, this.alias)
        .insert()
        .values(entity)
        .orUpdate(keys, ['userId'])
        .returning('*')
        .execute()
        .then((res) => res?.generatedMaps[0] as FullProfile);
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
