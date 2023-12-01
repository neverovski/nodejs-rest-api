import { container as Container } from 'tsyringe';

import { ILoggerService } from './interface';
import { LoggerInject } from './logger.enum';
import { LoggerService } from './logger.service';

export class LoggerDi {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.registerSingleton<ILoggerService>(
      LoggerInject.SERVICE,
      LoggerService,
    );
  }
}
