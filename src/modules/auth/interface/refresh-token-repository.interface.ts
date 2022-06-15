import {
  RefreshToken,
  FullRefreshToken,
  RefreshTokenOption,
} from '../auth.type';

export interface IRefreshTokenRepository {
  create(body: RefreshToken): Promise<FullRefreshToken>;
  findOneOrFail(options: RefreshTokenOption): Promise<FullRefreshToken>;
  update(
    query: Partial<FullRefreshToken>,
    body: Partial<RefreshToken>,
  ): Promise<void>;
}
