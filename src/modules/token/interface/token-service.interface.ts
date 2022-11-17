import {
  AccessTokenRequest,
  FullRefreshToken,
  RefreshToken,
  RefreshTokenPayload,
  TokenRequest,
  TokenResponse,
} from '../token.type';

export interface ITokenService {
  generateAccessToken(body: AccessTokenRequest): Promise<string>;
  generateRefreshToken(
    body: Omit<RefreshToken, 'jti' | 'expiredAt'>,
  ): Promise<string>;
  getToken(body: TokenRequest, ctx: UserAgentCtx): Promise<TokenResponse>;
  resolveRefreshToken(token: string): Promise<RefreshTokenPayload>;
  update(
    query: Partial<FullRefreshToken>,
    body: Partial<RefreshToken>,
  ): Promise<void>;
}
