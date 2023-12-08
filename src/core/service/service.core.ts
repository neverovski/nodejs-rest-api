import { LoggerCtx } from '@common/enums';
import { ILoggerService } from '@providers/logger';

export class ServiceCore {
  protected readonly logger?: ILoggerService;

  constructor() {
    this.init();
  }

  protected get loggerCtx(): LoggerCtx {
    return LoggerCtx.SERVICE;
  }

  protected handleError(err: unknown) {
    if (!this.logger) {
      return;
    }

    this.logger.error(err, {
      name: this.constructor.name,
      context: this.loggerCtx,
    });
  }

  protected init() {
    if (!this.logger) {
      return;
    }

    this.logger.debug(`${this.constructor.name} initialized...`, {
      context: this.loggerCtx,
    });
  }
}
