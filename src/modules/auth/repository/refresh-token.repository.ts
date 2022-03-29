import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core';

import { RefreshToken } from '../auth.type';
import { RefreshTokenEntity } from '../entity';

@EntityRepository(RefreshTokenEntity)
export default class RefreshTokenRepository extends RepositoryCore<RefreshTokenEntity> {
  createRefreshToken(body: RefreshToken): Promise<RefreshToken> {
    const refreshTokenEntity = new RefreshTokenEntity(body);

    return this.manager.save(refreshTokenEntity);
  }
}
