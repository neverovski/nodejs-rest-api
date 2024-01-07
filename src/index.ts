import 'reflect-metadata';

import {
  container as Container,
  inject as Inject,
  singleton as Singleton,
} from 'tsyringe';

import '@config/config.di';
import '@providers/provider.di';
import '@middleware/middleware.di';
import '@database/database.di';
import '@modules/module.di';

import { DatabaseInject, IDatabaseService } from '@database';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { Server } from './server';

@Singleton()
class Bootstrap {
  constructor(
    @Inject(DatabaseInject.SERVICE) private readonly database: IDatabaseService,
    @Inject(LoggerInject.SERVICE) private readonly logger: ILoggerService,
    @Inject(Server) private readonly server: Server,
  ) {}

  async run() {
    try {
      await this.database.connect();
      await this.server.run();

      // EventEmitter.emit('start');
      this.logger.log('The server is running');
    } catch (err) {
      // EventEmitter.emit('close');
      this.logger.error('Database or server not running', err);

      process.exit(1);
    }
  }
}

void Container.resolve(Bootstrap).run();
