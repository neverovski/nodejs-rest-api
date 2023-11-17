/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import '@providers/index.di';
import '@modules/index.di';

import { Logger } from '@libs';
import { EventEmitter } from '@utils';

import { AppConfig } from '@config';
import Middleware, { ErrorMiddleware } from '@middleware';
import db from 'src/database';

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
