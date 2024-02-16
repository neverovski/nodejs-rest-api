import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { DatabaseInject } from './database.enum';
import { DatabaseService } from './database.service';
import { IDatabaseService } from './interface';

class DatabaseDi extends DiCore {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.registerSingleton<IDatabaseService>(
      DatabaseInject.SERVICE,
      DatabaseService,
    );
  }
}

new DatabaseDi().register();
