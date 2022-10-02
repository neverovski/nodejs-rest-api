import { RepositoryCore } from '@core';

import { UserEntity } from './entity';
import { IUserRepository } from './interface';

export default class UserRepository
  extends RepositoryCore<UserEntity>
  implements IUserRepository
{
  constructor() {
    super(UserEntity, 'user');
  }
}
