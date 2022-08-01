import { NextFunction, Request, RequestHandler, Response } from 'express';

export default (handler: RequestHandler<any, any, any, any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);
