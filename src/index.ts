import { AppConfig } from '@config/index';
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
    app
      .init()
      .then(() => {
        EventEmitter.emit('start');
        Logger.info('Server start initialization...');
      })
      .catch((error) => {
        EventEmitter.emit('close');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Logger.error('Server fails to initialize...', error);
        process.exit(1);
      });
  })
  .catch((error) => {
    EventEmitter.emit('close');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Logger.error('Database fails to initialize...', error);
    process.exit(1);
  });
