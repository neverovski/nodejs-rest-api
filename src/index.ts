import { AppConfig, DBConfig } from '@config/index';
import db from '@db/index';
import Middleware, { ErrorMiddleware } from '@middleware/index';
import { EventEmitter, Logger } from '@utils/helpers';

import Server from './server';

const app = new Server({
  port: Number(AppConfig.port),
  middleware: Middleware,
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
      .start()
      .then((serverParams) => {
        EventEmitter.emit('start');
        Logger.info('Server initialized...', serverParams);
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
