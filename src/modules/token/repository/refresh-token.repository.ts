import { RepositoryCore } from '@core';

import { RefreshTokenEntity } from '../entity';
import { IRefreshTokenRepository } from '../interface';

export default class RefreshTokenRepository
  extends RepositoryCore<RefreshTokenEntity>
  implements IRefreshTokenRepository
{
  constructor() {
    super(RefreshTokenEntity, 'refresh');
  }
}
