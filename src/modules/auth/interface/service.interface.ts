import { IHttpException } from '@utils/index';

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
  forgotPassword(body: ForgotPasswordRequest): Promise<IHttpException>;
  login(body: LoginRequest): Promise<TokenResponse>;
  logout(body: LogoutRequest): Promise<void>;
  refreshToken(body: RefreshTokenRequest): Promise<TokenResponse>;
  resetPassword(body: ResetPasswordRequest): Promise<void>;
}

export interface ITokenService {
  generateAccessToken(body: AcessTokenRequest): Promise<string>;
  generateRefreshToken(
    body: Omit<RefreshToken, 'jwtid' | 'expiredAt'>,
  ): Promise<string>;
  getToken(body: TokenRequest): Promise<TokenResponse>;
  update(query: FullRefreshToken, body: RefreshToken): Promise<void>;
}
