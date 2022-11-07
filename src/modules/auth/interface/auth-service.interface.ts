import { PlatformRequest } from '@modules/platform';

import {
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
  TokenResponse,
} from '../auth.type';

export interface IAuthService {
  forgotPassword(body: ForgotPasswordRequest): Promise<void>;
  login(body: LoginRequest, ctx: RequestCtx): Promise<TokenResponse>;
  logout(body: LogoutRequest): Promise<void>;
  platform(body: PlatformRequest, ctx: RequestCtx): Promise<TokenResponse>;
  refreshToken(
    body: RefreshTokenRequest,
    ctx: RequestCtx,
  ): Promise<TokenResponse>;
  resetPassword(body: ResetPasswordRequest): Promise<void>;
}
