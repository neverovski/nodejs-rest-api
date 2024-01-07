import type { Response as ExpressResponse } from 'express';

import {
  AuthForgotPasswordByEmailRequest,
  AuthLoginRequest,
  AuthLogoutRequest,
  AuthPlatformRequest,
  AuthRefreshTokenRequest,
  AuthResetPasswordByEmailRequest,
} from '../auth.type';

export interface IAuthController {
  forgotPasswordByEmail(
    req: AuthForgotPasswordByEmailRequest,
    res: ExpressResponse,
  ): Promise<void>;
  login(req: AuthLoginRequest, res: ExpressResponse): Promise<void>;
  logout(req: AuthLogoutRequest, res: ExpressResponse): Promise<void>;
  platform(req: AuthPlatformRequest, res: ExpressResponse): Promise<void>;
  refreshToken(
    req: AuthRefreshTokenRequest,
    res: ExpressResponse,
  ): Promise<void>;
  resetPasswordByEmail(
    req: AuthResetPasswordByEmailRequest,
    res: ExpressResponse,
  ): Promise<void>;
}
