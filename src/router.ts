import { Express, Response, NextFunction, Request } from 'express';

export default (app: Express): void => {
  app.use((req: Request, _res: Response, next: NextFunction) =>
    !req.route ? next(new Error('ROUTE_NOT_FOUND')) : next(),
  );
};
