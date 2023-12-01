import { CreateProfile, FullProfile, UserRepositoryCtx } from '../../types';

export interface IProfileRepository {
  createOrUpdate(
    entity: CreateProfile,
    ctx?: UserRepositoryCtx,
  ): Promise<FullProfile>;
}
