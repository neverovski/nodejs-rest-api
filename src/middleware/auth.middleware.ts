import { Response, Request, NextFunction, RequestHandler } from 'express';

import { JwtConfig } from '@config/index';
import { MiddlewareCore } from '@core/index';
import {
  verifyToken,
  JWTPayload,
  getTokenFromHeader,
  getTokenFromCookies,
  HttpExceptionType,
  codeError,
} from '@utils/index';

class AuthMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const accessToken =
        getTokenFromHeader(req.headers) || getTokenFromCookies(req.cookies);

      if (accessToken) {
        try {
          const data = await verifyToken<JWTPayload>(
            accessToken,
            JwtConfig.secretAccessToken,
          );

          req.currentUser = {
            userId: data.sub,
            email: data.email,
            role: data.role,
          };

          return next();
        } catch (err) {
          return next(err);
        }
      }

      return next(codeError(HttpExceptionType.FORBIDDEN));
    };
  }
}

export default new AuthMiddleware();
