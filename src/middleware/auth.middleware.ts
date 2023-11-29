import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
  RequestHandler,
} from 'express';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { COOKIE_ACCESS_TOKEN, ROLE_ANONYMOUS } from '@common/constants';
import { ConfigKey, TokenType } from '@common/enums';
import { TokenNotProvidedException } from '@common/exceptions';
import { IJwtConfig } from '@config';
import { MiddlewareCore } from '@core';
import { ITokenService, TokenInject } from '@providers/token';

@Singleton()
export class AuthMiddleware extends MiddlewareCore {
  constructor(
    @Inject(ConfigKey.JWT) private readonly jwtConfig: IJwtConfig,
    @Inject(TokenInject.SERVICE) private readonly tokenService: ITokenService,
  ) {
    super();
  }

  handler(): RequestHandler {
    return async (
      req: ExpressRequest,
      _res: ExpressResponse,
      next: NextFunction,
    ) => {
      const token =
        this.extractTokenFromHeader(req) || this.extractTokenFromCookies(req);

      req.user = this.getUserForAnonymousRole();

      if (token) {
        try {
          const { userId, email, role } =
            await this.tokenService.verifyJwt<AccessTokenPayload>(
              token,
              this.jwtConfig.accessToken.secret,
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

  private extractTokenFromCookies(req: ExpressRequest): string | null {
    if (req.cookies && COOKIE_ACCESS_TOKEN in req.cookies) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return req.cookies.accessToken as string;
    }

    return null;
  }

  private extractTokenFromHeader(req: ExpressRequest): string | null {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === TokenType.BEARER && token ? token : null;
  }

  private getUserForAnonymousRole(): UserPayload {
    return { userId: 0, role: ROLE_ANONYMOUS };
  }
}
