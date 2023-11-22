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
  private readonly express: ExpressApp;

  constructor(express: ExpressApp) {
    this.express = express;

    this.init();
  }

  protected init(): void {
    this.base();

    this.express.use('/api/auth', new AuthRouter().init());
    this.express.use('/api/users', new UserRouter().init());

    this.notFound();
  }

  private base() {
    this.express.get('/', (_req: ExpressRequest, res: ExpressResponse) =>
      res.json({ message: 'base path' }),
    );
  }

  private notFound() {
    this.express.use(
      (req: ExpressRequest, _res: ExpressResponse, next: NextFunction) => {
        if (!req.route) {
          return next(new NotFoundException(i18n()['notFound.router']));
        }

        return next();
      },
    );
  }
}
