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
} from '../auth.type';

export interface IAuthService {
  forgotPassword(body: Pick<LoginRequest, 'email'>): Promise<IHttpException>;
  login(body: LoginRequest): Promise<TokenResponse>;
  logout(body: LogoutRequest): Promise<void>;
  refreshToken(body: RefreshTokenRequest): Promise<TokenResponse>;
  resetPassword(): void;
}

export interface ITokenService {
  generateAccessToken(body: AcessTokenRequest): Promise<string>;
  generateRefreshToken(
    body: Omit<RefreshToken, 'jwtid' | 'expiredAt'>,
  ): Promise<string>;
  getToken(body: TokenRequest): Promise<TokenResponse>;
  update(query: FullRefreshToken, body: RefreshToken): Promise<void>;
}
