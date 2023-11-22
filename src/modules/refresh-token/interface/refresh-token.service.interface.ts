import { FullRefreshToken, RefreshToken } from '../refresh-token.type';

export interface IRefreshTokenService {
  create(data: RefreshToken): Promise<FullRefreshToken>;
  getOneByPayload({ jti, sub }: JwtPayload): Promise<RefreshToken>;
  getOneWithException(
    query: Partial<FullRefreshToken>,
  ): Promise<FullRefreshToken>;
  update(
    query: Partial<FullRefreshToken>,
    data: Partial<RefreshToken>,
  ): Promise<void>;
}
