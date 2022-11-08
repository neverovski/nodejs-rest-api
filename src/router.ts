import type { Application, NextFunction, Request, Response } from 'express';

import { Exception, HttpCode, i18n } from '@libs';
import { AuthRouter } from '@modules/auth';
import { UserRouter } from '@modules/user';

export default (app: Application): void => {
  app.use('/api/auth', new AuthRouter().init());
  app.use('/api/users', new UserRouter().init());

  app.use((req: Request, _res: Response, next: NextFunction) =>
    !req.route
      ? next(
          Exception.getError(HttpCode.NOT_FOUND, {
            message: i18n()['notFound.router'],
          }),
        )
      : next(),
  );
};
