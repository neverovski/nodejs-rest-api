import { Response, Request, NextFunction, RequestHandler } from 'express';

import { JwtConfig } from '@config';
import { MiddlewareCore } from '@core';
import { JWTService } from '@providers/jwt';
import { JWTPayload, HttpException, Role } from '@utils';
import { ResponseHelper, TokenHelper } from '@utils/helpers';

class AuthMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const accessToken =
        TokenHelper.getFromHeader(req.headers) ||
        TokenHelper.getFromCookies(req.cookies);

      req.user = Object.freeze({
        role: Role.ANONYMOUS,
        email: '',
      });

      if (accessToken) {
        try {
          const { userId, email, role } =
            await JWTService.verifyAsync<JWTPayload>(
              accessToken,
              JwtConfig.secretAccessToken,
            );

          req.user = Object.freeze({ userId, email, role });

          return next();
        } catch (err) {
          return next(err);
        }
      }

      return next(ResponseHelper.error(HttpException.TOKEN_NOT_PROVIDED));
    };
  }
}

export default new AuthMiddleware();
