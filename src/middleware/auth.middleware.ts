import { NextFunction, Request, RequestHandler, Response } from 'express';
import { container } from 'tsyringe';

import { JwtConfig } from '@config';
import { MiddlewareCore } from '@core';
import { IJwtService, JwtInject } from '@providers/jwt';
import { HttpException, JWTPayload, Role } from '@utils';
import { ResponseHelper, TokenHelper } from '@utils/helpers';

class AuthMiddleware extends MiddlewareCore {
  private readonly jwtService: IJwtService;

  constructor() {
    super();

    this.jwtService = container.resolve<IJwtService>(JwtInject.JWT_SERVICE);
  }

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
            await this.jwtService.verifyAsync<JWTPayload>(
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
