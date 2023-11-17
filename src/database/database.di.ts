import { container } from 'tsyringe';

import { DatabaseInject } from './database.enum';
import { DatabaseService } from './database.service';
import { IDatabaseService } from './interface';

export class DatabaseDi {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<IDatabaseService>(
      DatabaseInject.SERVICE,
      new DatabaseService(),
    );
  }
}
