import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { NotFoundException } from '@common/exceptions';
import { SwaggerUtil } from '@common/utils';
import { RouterCore } from '@core';
import { i18n } from '@i18n';
import { AuthRouter } from '@modules/auth/auth.router';
import { UserRouter } from '@modules/user/user.router';

@Singleton()
export class Router extends RouterCore {
  constructor(
    @Inject(AuthRouter) private readonly authRouter: AuthRouter,
    @Inject(UserRouter) private readonly userRouter: UserRouter,
  ) {
    super();

    this.init();
  }

  init() {
    this.base();

    this.router.use('/api/auth', this.authRouter.getRouter());
    this.router.use('/api/users', this.userRouter.getRouter());

    this.router.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(SwaggerUtil.spec()),
    );

    this.notFound();
  }

  private base() {
    this.router.get('/', (_req: ExpressRequest, res: ExpressResponse) =>
      res.json({ message: 'base path' }),
    );
  }

  private notFound() {
    this.router.use(
      (req: ExpressRequest, _res: ExpressResponse, next: NextFunction) => {
        if (!req.route) {
          return next(new NotFoundException(i18n()['notFound.router']));
        }

        return next();
      },
    );
  }
}
