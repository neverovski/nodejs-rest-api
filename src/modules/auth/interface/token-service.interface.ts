import {
  AccessTokenRequest,
  FullRefreshToken,
  RefreshToken,
  RefreshTokenPayload,
  TokenRequest,
  TokenResponse,
} from '../auth.type';

export interface ITokenService {
  generateAccessToken(body: AccessTokenRequest): Promise<string>;
  generateRefreshToken(
    body: Omit<RefreshToken, 'jti' | 'expiredAt'>,
  ): Promise<string>;
  getToken(body: TokenRequest, ctx: RequestCtx): Promise<TokenResponse>;
  resolveRefreshToken(token: string): Promise<RefreshTokenPayload>;
  update(
    query: Partial<FullRefreshToken>,
    body: Partial<RefreshToken>,
  ): Promise<void>;
}
