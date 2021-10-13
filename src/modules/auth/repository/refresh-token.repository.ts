import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core/index';

import { RefreshToken } from '../auth.type';
import { RefreshTokenEntity } from '../entity';

@EntityRepository(RefreshTokenEntity)
export default class RefreshTokenRepository extends RepositoryCore<RefreshTokenEntity> {
  async createRefreshToken(body: RefreshToken): Promise<RefreshToken> {
    const token = new RefreshTokenEntity(body);

    return this.manager.save(token);
  }

  async findOneTokenOrFail(
    query: Partial<RefreshToken>,
  ): Promise<RefreshToken> {
    return this.findOneOrFail({ where: query });
  }
}
