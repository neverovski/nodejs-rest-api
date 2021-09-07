import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core/index';

import { RefreshTokenEntity } from '../entity';

@EntityRepository(RefreshTokenEntity)
export default class RefreshTokenRepository extends RepositoryCore<RefreshTokenEntity> {}
