import { RepositoryCtx } from '@common/types';

import {
  CreateUser,
  FullUser,
  UpdateUser,
  UserOption,
  UserQuery,
} from '../../types';

export interface IUserRepository {
  countByQuery(options: UserOption): Promise<number>;
  create(entity: CreateUser, ctx?: RepositoryCtx): Promise<FullUser>;
  delete(query: UserQuery): Promise<void>;
  findByQuery(options: UserOption): Promise<FullUser[]>;
  findOne(options: UserOption, ctx?: RepositoryCtx): Promise<FullUser | null>;
  findOneOrFail(options: UserOption): Promise<FullUser>;
  update(
    query: UserQuery,
    entity: UpdateUser,
    ctx?: RepositoryCtx,
  ): Promise<void>;
}
