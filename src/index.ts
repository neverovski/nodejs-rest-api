/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppConfig } from '@config';
import db from '@db/index';
import { Logger } from '@lib';
import Middleware, { ErrorMiddleware } from '@middleware';
import { EventEmitter } from '@utils/helpers';

import Server from './server';

const app = new Server({
  port: Number(AppConfig.port),
  initMiddleware: Middleware,
  errorMiddleware: ErrorMiddleware,
});

db.connect()
  .then(() => {
    Logger.debug({ message: 'Database initialized...' });
    app
      .init()
      .then(() => {
        EventEmitter.emit('start');
        Logger.info({ message: 'Server start initialization..' });
      })
      .catch((error) => {
        EventEmitter.emit('close');
        Logger.error({ message: 'Server fails to initialize...', error });
        process.exit(1);
      });
  })
  .catch((error) => {
    EventEmitter.emit('close');
    Logger.error({ message: 'Database fails to initialize...', error });
    process.exit(1);
  });
