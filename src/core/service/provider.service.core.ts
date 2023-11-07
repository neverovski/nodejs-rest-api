import { container } from 'tsyringe';

import { LoggerCtx } from '@common/enums';
import { InternalServerErrorException } from '@common/exceptions';
import { ILoggerService, LoggerInject } from '@providers/logger';

export class ProviderServiceCore {
  protected readonly logger: ILoggerService;
  private readonly loggerCtx: LoggerCtx;

  constructor(loggerCtx?: LoggerCtx) {
    this.loggerCtx = loggerCtx || LoggerCtx.SERVICE;
    this.logger = container.resolve<ILoggerService>(LoggerInject.SERVICE);

    this.init();
  }

  protected handleError(err: unknown) {
    this.logger.error(this.constructor.name, { err, context: this.loggerCtx });

    return new InternalServerErrorException();
  }

  protected init() {
    this.logger.debug(`${this.constructor.name} initialized...`, {
      context: this.loggerCtx,
    });
  }
}
