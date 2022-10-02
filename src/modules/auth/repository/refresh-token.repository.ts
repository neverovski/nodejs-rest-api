import { RepositoryCore } from '@core';

import { FullRefreshToken, RefreshToken } from '../auth.type';
import { RefreshTokenEntity } from '../entity';
import { IRefreshTokenRepository } from '../interface';

export default class RefreshTokenRepository
  extends RepositoryCore<RefreshTokenEntity>
  implements IRefreshTokenRepository
{
  constructor() {
    super(RefreshTokenEntity, 'refresh');
  }

  async update(
    query: Partial<FullRefreshToken>,
    body: Partial<RefreshToken>,
  ): Promise<void> {
    try {
      await this.orm.update(query, body);
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
