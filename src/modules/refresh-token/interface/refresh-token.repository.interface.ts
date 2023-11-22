import {
  FullRefreshToken,
  RefreshToken,
  RefreshTokenOption,
} from '../refresh-token.type';

export interface IRefreshTokenRepository {
  create(entity: RefreshToken): Promise<FullRefreshToken>;
  findOneOrFail(options: RefreshTokenOption): Promise<FullRefreshToken>;
  update(
    query: Partial<FullRefreshToken>,
    entity: Partial<RefreshToken>,
  ): Promise<void>;
}
