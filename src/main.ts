import 'reflect-metadata';

import '@providers/index.di';
import '@modules/index.di';

import { container } from 'tsyringe';

import { AppConfig } from '@config';
import { DatabaseDi, DatabaseInject, IDatabaseService } from '@database';
import Middleware, { ErrorMiddleware } from '@middleware';

import { AppServer } from './server';

DatabaseDi.init();

const app = new AppServer({
  port: Number(AppConfig.port),
  middlewares: Middleware,
  errorMiddleware: ErrorMiddleware,
});

const database = container.resolve<IDatabaseService>(DatabaseInject.SERVICE);

database
  .connect()
  .then(() => {
    console.info({ message: 'Database initialized...' });

    app
      .init()
      .then(() => {
        // EventEmitter.emit('start');

        console.info({ message: 'Server start initialization..' });
      })
      .catch((error) => {
        // EventEmitter.emit('close');

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        console.error({ message: 'Server fails to initialize...', error });
        process.exit(1);
      });
  })
  .catch((error) => {
    // EventEmitter.emit('close');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.error({ message: 'Database fails to initialize...', error });
    process.exit(1);
  });
