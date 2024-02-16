import { Server as HttpServer, createServer } from 'http';

import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application as ExpressApp } from 'express';
import helmet from 'helmet';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey, MiddlewareKey } from '@common/enums';
import { IMiddleware } from '@common/interfaces';
import { IAppConfig } from '@config';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { Router } from './router';

@Singleton()
export class Server {
  private express!: ExpressApp;
  private http!: HttpServer;
  private readonly port: number;

  constructor(
    @Inject(ConfigKey.APP) private readonly appConfig: IAppConfig,
    @Inject(LoggerInject.SERVICE)
    private readonly loggerService: ILoggerService,
    @Inject(MiddlewareKey.ERROR) private readonly errorMiddleware: IMiddleware,
    @Inject(MiddlewareKey.INIT) private readonly initMiddleware: IMiddleware,
    @Inject(MiddlewareKey.LOGGER)
    private readonly loggerMiddleware: IMiddleware,
    @Inject(Router) private readonly router: Router,
  ) {
    this.port = Number(this.appConfig.port);
  }

  async run(): Promise<void> {
    this.express = express();
    this.http = createServer(this.express);

    this.handleMiddlewareBefore();
    this.handleRouter();
    this.handleMiddlewareAfter();

    await this.listenHttpServer();
  }

  private handleMiddlewareAfter(): void {
    this.express.use(this.errorMiddleware.handler());
  }

  private handleMiddlewareBefore(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(cookieParser());

    this.express.use(this.initMiddleware.handler());
    this.express.use(this.loggerMiddleware.handler());
  }

  private handleRouter(): void {
    this.express.use(this.router.getRouter());
  }

  private async listenHttpServer(): Promise<void> {
    return new Promise((resolve) => {
      process.on('unhandledRejection', (reason) => {
        this.loggerService.error('UnhandledRejection', {
          error: reason,
        });
      });

      process.on('rejectionHandled', (promise) => {
        this.loggerService.warn('RejectionHandled', {
          error: promise,
        });
      });

      process.on('multipleResolves', (type, promise, reason) => {
        this.loggerService.error('MultipleResolves', {
          error: { type, promise, reason },
        });
      });

      process.on('uncaughtException', (error) => {
        this.loggerService.error('UncaughtException', { error });
        process.exit(1);
      });

      return this.http.listen(this.port, () => resolve());
    });
  }
}
