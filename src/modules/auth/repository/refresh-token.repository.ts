import { RepositoryCore } from '@core';

import {
  FullRefreshToken,
  RefreshToken,
  RefreshTokenOption,
} from '../auth.type';
import { RefreshTokenEntity } from '../entity';
import { IRefreshTokenRepository } from '../interface';

export default class RefreshTokenRepository
  extends RepositoryCore<RefreshTokenEntity>
  implements IRefreshTokenRepository
{
  constructor() {
    super(RefreshTokenEntity, 'r');
  }

  async create(body: RefreshToken): Promise<FullRefreshToken> {
    try {
      const refreshTokenEntity = this.orm.create(body);

      return await this.orm.save(refreshTokenEntity);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOneOrFail(options: RefreshTokenOption): Promise<FullRefreshToken> {
    try {
      return await this.orm.findOneOrFail(options);
    } catch (err) {
      throw this.handleError(err);
    }
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
