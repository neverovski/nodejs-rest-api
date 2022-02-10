import { Response, Request, NextFunction, RequestHandler } from 'express';

import { JwtConfig } from '@config/index';
import { MiddlewareCore } from '@core/index';
import { JWTService } from '@providers/jwt';
import {
  JWTPayload,
  TokenHelper,
  HttpExceptionType,
  ResponseHelper,
} from '@utils/index';

class AuthMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const accessToken =
        TokenHelper.getTokenFromHeader(req.headers) ||
        TokenHelper.getTokenFromCookies(req.cookies);

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

      return next(ResponseHelper.error(HttpExceptionType.TOKEN_NOT_PROVIDED));
    };
  }
}

export default new AuthMiddleware();
