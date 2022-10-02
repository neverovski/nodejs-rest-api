import {
  FullRefreshToken,
  RefreshToken,
  RefreshTokenOption,
} from '../auth.type';

export interface IRefreshTokenRepository {
  create(body: RefreshToken): Promise<Id>;
  findOneOrFail(options: RefreshTokenOption): Promise<FullRefreshToken>;
  update(
    query: Partial<FullRefreshToken>,
    body: Partial<RefreshToken>,
  ): Promise<void>;
}
