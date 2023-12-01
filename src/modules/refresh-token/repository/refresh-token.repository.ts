import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { RepositoryCore } from '@core';
import { DatabaseInject, IDatabaseService } from '@database';

import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { IRefreshTokenRepository } from '../interface';

@Singleton()
export class RefreshTokenRepository
  extends RepositoryCore<RefreshTokenEntity>
  implements IRefreshTokenRepository
{
  constructor(
    @Inject(DatabaseInject.SERVICE) databaseService: IDatabaseService,
  ) {
    super(databaseService.dataSource, RefreshTokenEntity);
  }
}
