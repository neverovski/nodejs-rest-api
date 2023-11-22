import { Server as HttpServer, createServer } from 'http';

import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application as ExpressApp } from 'express';
import helmet from 'helmet';
import { container } from 'tsyringe';

import { IMiddleware } from '@common/interfaces';
import { AppServerInit } from '@common/types';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { AppRouter } from './router';

export class AppServer {
  private readonly errorMiddleware: IMiddleware;
  private express!: ExpressApp;
  private http!: HttpServer;
  private readonly logger: ILoggerService;
  private readonly middlewares: IMiddleware[];
  private readonly port: number;

  constructor({ port, middlewares, errorMiddleware }: AppServerInit) {
    this.port = port;
    this.middlewares = middlewares;
    this.errorMiddleware = errorMiddleware;

    this.logger = container.resolve<ILoggerService>(LoggerInject.SERVICE);
  }

  async init(): Promise<void> {
    this.express = express();
    this.http = createServer(this.express);

    this.handleMiddleware();
    this.handleRouter();
    this.handleMiddlewareError();

    await this.runHttp();
  }

  private handleMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(cookieParser());

    for (const m of this.middlewares) {
      try {
        this.express.use(m.handler());
      } catch (err) {
        throw err;
      }
    }
  }

  private handleMiddlewareError(): void {
    try {
      this.express.use(this.errorMiddleware.handler());
    } catch (err) {
      throw new Error('Default error middleware failed.');
    }
  }

  private handleRouter(): void {
    new AppRouter(this.express);
  }

  private async runHttp(): Promise<void> {
    return new Promise((resolve) => {
      process.on('unhandledRejection', (reason) => {
        this.logger.error({ message: 'unhandledRejection', error: reason });
      });

      process.on('rejectionHandled', (promise) => {
        this.logger.warn({ message: 'rejectionHandled', error: promise });
      });

      process.on('multipleResolves', (type, promise, reason) => {
        this.logger.error({
          message: 'multipleResolves',
          error: { type, promise, reason },
        });
      });

      process.on('uncaughtException', (error) => {
        this.logger.error({ message: 'uncaughtException', error });
        process.exit(1);
      });

      return this.http.listen(this.port, () => resolve());
    });
  }
}
