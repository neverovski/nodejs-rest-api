import { Response, Request, NextFunction, RequestHandler } from 'express';

import { JwtConfig } from '@config';
import { MiddlewareCore } from '@core';
import { JWTService } from '@providers/jwt';
import {
  JWTPayload,
  TokenHelper,
  HttpExceptionType,
  ResponseHelper,
} from '@utils';

class AuthMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const accessToken =
        TokenHelper.getTokenFromHeader(req.headers) ||
        TokenHelper.getTokenFromCookies(req.cookies);

      if (accessToken) {
        try {
          const { userId, email, role } =
            await JWTService.verifyAsync<JWTPayload>(
              accessToken,
              JwtConfig.secretAccessToken,
            );

          req.currentUser = { userId, email, role };

          return next();
        } catch (err) {
          return next(err);
        }
      }

      return next(ResponseHelper.error(HttpExceptionType.TOKEN_NOT_PROVIDED));
    };
  }
}

export default new AuthMiddleware();
