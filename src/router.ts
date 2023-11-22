import type {
  Application as ExpressApp,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';

import { NotFoundException } from '@common/exceptions';
import { i18n } from '@i18n';
import { AuthRouter } from '@modules/auth/auth.router';
import { UserRouter } from '@modules/user/user.router';

export class AppRouter {
  private readonly app: ExpressApp;

  constructor(app: ExpressApp) {
    this.app = app;

    this.init();
  }

  protected init(): void {
    this.app.use('/api/auth', new AuthRouter().init());
    this.app.use('/api/users', new UserRouter().init());

    this.notFound();
  }

  private notFound() {
    this.app.use(
      (req: ExpressRequest, _res: ExpressResponse, next: NextFunction) => {
        if (!req.route) {
          return next(new NotFoundException(i18n()['notFound.router']));
        }

        return next();
      },
    );
  }
}
