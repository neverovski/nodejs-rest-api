import type { Response as ExpressResponse } from 'express';

import {
  AuthLoginRequest,
  AuthLogoutRequest,
  AuthPlatformRequest,
  AuthRefreshTokenRequest,
} from '../auth.type';

export interface IAuthController {
  login(req: AuthLoginRequest, res: ExpressResponse): Promise<void>;
  logout(req: AuthLogoutRequest, res: ExpressResponse): Promise<void>;
  platform(req: AuthPlatformRequest, res: ExpressResponse): Promise<void>;
  refreshToken(
    req: AuthRefreshTokenRequest,
    res: ExpressResponse,
  ): Promise<void>;
}
