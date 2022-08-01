import {
  AcessTokenRequest,
  FullRefreshToken,
  RefreshToken,
  RefreshTokenPayload,
  TokenRequest,
  TokenResponse,
} from '../auth.type';

export interface ITokenService {
  generateAccessToken(body: AcessTokenRequest): Promise<string>;
  generateRefreshToken(
    body: Omit<RefreshToken, 'jwtid' | 'expiredAt'>,
  ): Promise<string>;
  getToken(body: TokenRequest, ctx: Context): Promise<TokenResponse>;
  resolveRefreshToken(token: string): Promise<RefreshTokenPayload>;
  update(
    query: Partial<FullRefreshToken>,
    body: Partial<RefreshToken>,
  ): Promise<void>;
}
