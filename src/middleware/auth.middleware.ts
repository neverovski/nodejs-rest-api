import { NextFunction, Request, RequestHandler, Response } from 'express';

import { JwtConfig } from '@config';
import { MiddlewareCore } from '@core';
import { TokenHelper } from '@helpers';
import { Crypto, Exception, HttpCode } from '@lib';
import { Role } from '@utils';

class AuthMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const accessToken =
        TokenHelper.getFromHeader(req.headers) ||
        TokenHelper.getFromCookies(req.cookies);

      req.user = Object.freeze({
        role: Role.ANONYMOUS,
        userId: 0,
      });

      if (accessToken) {
        try {
          const { userId, email, role } =
            await Crypto.verifyJWTAsync<JwtPayload>(
              accessToken,
              JwtConfig.secretAccessToken,
            );

          req.user = Object.freeze({ userId, email, role });

          return next();
        } catch (err) {
          return next(err);
        }
      }

      return next(Exception.getError(HttpCode.TOKEN_NOT_PROVIDED));
    };
  }
}

export default new AuthMiddleware();
