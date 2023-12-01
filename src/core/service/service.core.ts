import { container as Container } from 'tsyringe';

import { LoggerCtx } from '@common/enums';
import { ILoggerService, LoggerInject } from '@providers/logger';

export class ServiceCore {
  protected readonly logger: ILoggerService;
  private readonly loggerCtx: LoggerCtx;

  constructor(loggerCtx?: LoggerCtx) {
    this.loggerCtx = loggerCtx || LoggerCtx.SERVICE;
    this.logger = Container.resolve<ILoggerService>(LoggerInject.SERVICE);

    this.init();
  }

  protected handleError(err: unknown) {
    this.logger.error(err, {
      name: this.constructor.name,
      context: this.loggerCtx,
    });
  }

  protected init() {
    this.logger.debug(`${this.constructor.name} initialized...`, {
      context: this.loggerCtx,
    });
  }
}
