import { AppConfig, DBConfig } from '@config/index';
import { Logger } from '@core/index';
import db from '@db/index';
import Middleware, { ErrorMiddleware } from '@middleware/index';
import { EventEmitter } from '@utils/index';

import Server from './server';

const app = new Server({
  port: Number(AppConfig.port),
  initMiddleware: Middleware,
  errorMiddleware: ErrorMiddleware,
});

db.connect()
  .then(() => {
    Logger.debug('Database initialized...');
    Logger.debug('--- SQL DATABASE CONFIG ---');
    Logger.debug(`CLIENT: ${DBConfig.client}`);
    Logger.debug(`USER: ${DBConfig.user}`);
    Logger.debug(`HOST: ${DBConfig.host}`);
    Logger.debug(`PORT: ${DBConfig.port}`);
    Logger.debug(`DATABASE: ${DBConfig.database}`);
    app
      .init()
      .then(() => {
        EventEmitter.emit('start');
        Logger.info('Server start initialization...');
        Logger.debug('--- APP CONFIG ---');
        Logger.debug(`HOST: ${AppConfig.host}`);
        Logger.debug(`PORT: ${AppConfig.port}`);
        Logger.debug(`NAME: ${AppConfig.name}`);
      })
      .catch((error) => {
        EventEmitter.emit('close');
        Logger.error('Server fails to initialize...', error);
        process.exit(1);
      });
  })
  .catch((error) => {
    EventEmitter.emit('close');
    Logger.error('Database fails to initialize...', error);
    process.exit(1);
  });
