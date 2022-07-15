import { createServer, Server as HTTPServer } from 'http';

import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';

import { MiddlewareCore } from '@core';
import { Logger } from '@core/logger';

import Router from './router';

type ServerType = {
  errorMiddleware: MiddlewareCore;
  initMiddleware: MiddlewareCore[];
  port: number;
};

export default class Server {
  private app!: Application;
  private readonly errorMiddleware: MiddlewareCore;
  private http!: HTTPServer;
  private readonly initMiddleware: MiddlewareCore[];
  private readonly port: number;

  constructor({ port, initMiddleware, errorMiddleware }: ServerType) {
    this.port = port;
    this.initMiddleware = initMiddleware;
    this.errorMiddleware = errorMiddleware;
  }

  async init(): Promise<void> {
    this.app = express();
    this.http = createServer(this.app);

    this.handleMiddleware();
    this.handleRoute();
    this.handleError();

    await this.handleListen();
  }

  private handleError(): void {
    try {
      this.app.use(this.errorMiddleware.handler());
    } catch (err) {
      throw new Error('Default error middleware failed.');
    }
  }

  private async handleListen(): Promise<void> {
    return new Promise((resolve) => {
      process.on('unhandledRejection', (reason) => {
        Logger.error({ message: 'unhandledRejection', error: reason });
      });

      process.on('rejectionHandled', (promise) => {
        Logger.warn({ message: 'rejectionHandled', error: promise });
      });

      process.on('multipleResolves', (type, promise, reason) => {
        Logger.error({
          message: 'multipleResolves',
          error: { type, promise, reason },
        });
      });

      process.on('uncaughtException', (error) => {
        Logger.fatal({ message: 'uncaughtException', error });
        process.exit(1);
      });

      return this.http.listen(this.port, () => resolve());
    });
  }

  private handleMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(cookieParser());

    for (const m of this.initMiddleware) {
      try {
        this.app.use(m.handler());
      } catch (err) {
        throw err;
      }
    }
  }

  private handleRoute(): void {
    this.app.get('/', (_req: Request, res: Response) =>
      res.json({ message: 'base path' }),
    );

    Router(this.app);
  }
}
