import { Express, Response, NextFunction, Request } from 'express';

import { AuthRouter } from '@modules/auth';

export default (app: Express): void => {
  app.use('/api/auth', new AuthRouter().init());

  app.use((req: Request, _res: Response, next: NextFunction) =>
    !req.route ? next(new Error('ROUTE_NOT_FOUND')) : next(),
  );
};
