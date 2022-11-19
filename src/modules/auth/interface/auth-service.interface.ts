import { PlatformRequest } from '@modules/platform';
import { TokenResponse } from '@modules/token';

import {
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
} from '../auth.type';

export interface IAuthService {
  forgotPassword(body: ForgotPasswordRequest): Promise<void>;
  login(body: LoginRequest, ctx?: UserAgentCtx): Promise<TokenResponse>;
  logout(body: LogoutRequest): Promise<void>;
  platform(body: PlatformRequest, ctx?: UserAgentCtx): Promise<TokenResponse>;
  refreshToken(
    body: RefreshTokenRequest,
    ctx?: UserAgentCtx,
  ): Promise<TokenResponse>;
  resetPassword(body: ResetPasswordRequest): Promise<void>;
}
