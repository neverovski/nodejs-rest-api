import { inject } from 'tsyringe';

import { RepositoryCore } from '@core';
import { DatabaseInject, IDatabaseService } from '@database';

import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { IRefreshTokenRepository } from '../interface';

export class RefreshTokenRepository
  extends RepositoryCore<RefreshTokenEntity>
  implements IRefreshTokenRepository
{
  constructor(
    @inject(DatabaseInject.SERVICE) databaseService: IDatabaseService,
  ) {
    super(databaseService.dataSource, RefreshTokenEntity);
  }
}
