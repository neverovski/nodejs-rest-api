import { container } from 'tsyringe';

import { ILoggerService } from './interface';
import { LoggerInject } from './logger.enum';
import { LoggerService } from './logger.service';

export class LoggerDi {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<ILoggerService>(
      LoggerInject.SERVICE,
      new LoggerService(),
    );
  }
}
