import { Response, Request, NextFunction, RequestHandler } from 'express';

import { JwtConfig } from '@config/index';
import { MiddlewareCore } from '@core/index';
import { JWTService } from '@providers/jwt';
import {
  JWTPayload,
  getTokenFromHeader,
  getTokenFromCookies,
  HttpExceptionType,
  httpError,
} from '@utils/index';

class AuthMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const accessToken =
        getTokenFromHeader(req.headers) || getTokenFromCookies(req.cookies);

      if (accessToken) {
        try {
          const data = await JWTService.verifyAsync<JWTPayload>(
            accessToken,
            JwtConfig.secretAccessToken,
          );

          req.currentUser = {
            userId: data.userId,
            email: data.email,
            role: data.role,
          };

          return next();
        } catch (err) {
          return next(err);
        }
      }

      return next(httpError(HttpExceptionType.FORBIDDEN));
    };
  }
}

export default new AuthMiddleware();
