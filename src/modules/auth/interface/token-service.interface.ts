import { FullUser } from '@modules/user';

import {
  TokenResponse,
  RefreshToken,
  FullRefreshToken,
  AcessTokenRequest,
  TokenRequest,
} from '../auth.type';

export interface ITokenService {
  generateAccessToken(body: AcessTokenRequest): Promise<string>;
  generateRefreshToken(
    body: Omit<RefreshToken, 'jwtid' | 'expiredAt'>,
  ): Promise<string>;
  getToken(body: TokenRequest, ctx: Context): Promise<TokenResponse>;
  resolveRefreshToken(
    token: string,
  ): Promise<{ token: RefreshToken; user: FullUser }>;
  update(
    query: Partial<FullRefreshToken>,
    body: Partial<RefreshToken>,
  ): Promise<void>;
}
