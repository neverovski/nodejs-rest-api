import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core/index';

import { RefreshToken } from '../auth.type';
import { RefreshTokenEntity } from '../entity';

@EntityRepository(RefreshTokenEntity)
export default class RefreshTokenRepository extends RepositoryCore<RefreshTokenEntity> {
  createRefreshToken(body: RefreshToken): Promise<RefreshToken> {
    return this.manager.save(new RefreshTokenEntity(body));
  }
}
