import { FullUser } from '@modules/user';

import {
  LoginRequest,
  RefreshTokenRequest,
  TokenResponse,
  LogoutRequest,
  RefreshToken,
  FullRefreshToken,
  AcessTokenRequest,
  TokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../auth.type';

export interface IAuthService {
  forgotPassword(body: ForgotPasswordRequest): Promise<void>;
  login(body: LoginRequest, ctx: Context): Promise<TokenResponse>;
  logout(body: LogoutRequest): Promise<void>;
  refreshToken(body: RefreshTokenRequest, ctx: Context): Promise<TokenResponse>;
  resetPassword(body: ResetPasswordRequest): Promise<void>;
}

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
