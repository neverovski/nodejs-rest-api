import { IMiddleware } from '../interfaces';

export type AppServerInit = {
  errorMiddleware: IMiddleware;
  middlewares: IMiddleware[];
  port: number;
};
