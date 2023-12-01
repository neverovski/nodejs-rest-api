import { container as Container } from 'tsyringe';

import { DatabaseInject } from './database.enum';
import { DatabaseService } from './database.service';
import { IDatabaseService } from './interface';

class DatabaseDi {
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
