import { urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { MiddlewareCore } from '@core/index';
import { Logger } from '@utils/index';

import Router from './router';

type ServerType = {
  port: number;
  middleware: MiddlewareCore[];
  errorMiddleware: MiddlewareCore;
};

export default class Server {
  private port: number;
  private middleware: MiddlewareCore[];
  private errorMiddleware: MiddlewareCore;

  constructor(options: ServerType) {
    this.port = options.port;
    this.middleware = options.middleware;
    this.errorMiddleware = options.errorMiddleware;
  }

  start(): Promise<{ port: number }> {
    Logger.info('Server start initialization...');

    return new Promise((resolve, reject) => {
      const app = express();

      app.use(helmet());
      app.use(cors());
      app.use(urlencoded({ extended: false }));

      /**
       * middleware initialization
       */
      for (const m of this.middleware) {
        try {
          m.init();
          app.use(m.handler());
        } catch (e) {
          return reject(e);
        }
      }

      Router(app);

      /**
       * error handler
       */
      try {
        this.errorMiddleware.init();
        app.use(this.errorMiddleware.handler());
      } catch (err) {
        return reject(new Error('Default error middleware failed.'));
      }

      process.on('unhandledRejection', (reason) => {
        const error = 'Error - unhandled rejection';
        Logger.error('unhandledRejection', new Error(error), reason);
      });

      process.on('rejectionHandled', (reason) => {
        const error = 'Error - rejection handled';
        Logger.warn('rejectionHandled', new Error(error), reason);
      });

      process.on('multipleResolves', (type, promise, value) => {
        const error = 'Error - multiple resolves';
        Logger.error('multipleResolves', new Error(error), {
          type,
          promise,
          value,
        });
      });

      process.on('uncaughtException', (error) => {
        Logger.fatal('uncaughtException', error);
        process.exit(1);
      });

      return app.listen(this.port, () => resolve({ port: this.port }));
    });
  }
}
