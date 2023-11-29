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

import { Server } from './server';

@Singleton()
class Bootstrap {
  constructor(
    @Inject(Server) private readonly server: Server,
    @Inject(DatabaseInject.SERVICE) private readonly database: IDatabaseService,
  ) {}

  async run() {
    try {
      await this.database.connect();
      await this.server.run();

      // EventEmitter.emit('start');
      console.info({ message: 'Вatabase and server started...' });
    } catch (err) {
      // EventEmitter.emit('close');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      console.error({ message: 'Database or server not running', err });

      process.exit(1);
    }
  }
}

void Container.resolve(Bootstrap).run();
