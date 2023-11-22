import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { container } from 'tsyringe';

import { COOKIE_ACCESS_TOKEN, ROLE_ANONYMOUS } from '@common/constants';
import { TokenType } from '@common/enums';
import { TokenNotProvidedException } from '@common/exceptions';
import { JwtConfig } from '@config';
import { MiddlewareCore } from '@core';
import { ITokenService, TokenInject } from '@providers/token';

class AuthMiddleware extends MiddlewareCore {
  protected readonly tokenService: ITokenService;

  constructor() {
    super();

    this.tokenService = container.resolve<ITokenService>(TokenInject.SERVICE);
  }

  handler(): RequestHandler {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const token =
        this.extractTokenFromHeader(req) || this.extractTokenFromCookies(req);

      req.user = this.getUserForAnonymousRole();

      if (token) {
        try {
          const { userId, email, role } =
            await this.tokenService.verifyJwt<AccessTokenPayload>(
              token,
              JwtConfig.accessToken.secret,
            );

          req.user = Object.freeze({ userId, email, role });

          return next();
        } catch (err) {
          return next(err);
        }
      }

      return next(new TokenNotProvidedException());
    };
  }

  private extractTokenFromCookies(req: Request): string | null {
    if (req.cookies && COOKIE_ACCESS_TOKEN in req.cookies) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return req.cookies.accessToken as string;
    }

    return null;
  }

  private extractTokenFromHeader(req: Request): string | null {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === TokenType.BEARER && token ? token : null;
  }

  private getUserForAnonymousRole(): UserPayload {
    return { userId: 0, role: ROLE_ANONYMOUS };
  }
}

export default new AuthMiddleware();
