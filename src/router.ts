import { Express, Response, NextFunction, Request } from 'express';

import { AuthRouter } from '@modules/auth';
import { UserRouter } from '@modules/user';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

export default (app: Express): void => {
  app.use('/api/auth', new AuthRouter().init());
  app.use('/api/users', new UserRouter().init());

  app.use((req: Request, _res: Response, next: NextFunction) =>
    !req.route
      ? next(ResponseHelper.error(HttpException.ROUTE_NOT_FOUND))
      : next(),
  );
};
