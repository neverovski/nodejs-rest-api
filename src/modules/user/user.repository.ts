import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core/index';

import { UserEntity } from './entity';

@EntityRepository(UserEntity)
export default class UserRepository extends RepositoryCore<UserEntity> {}
