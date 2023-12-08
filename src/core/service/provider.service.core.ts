import { LoggerCtx } from '@common/enums';
import { InternalServerErrorException } from '@common/exceptions';
import type { ILoggerService } from '@providers/logger';

export class ProviderServiceCore {
  protected readonly logger?: ILoggerService;

  constructor() {
    this.init();
  }

  protected get loggerCtx(): LoggerCtx {
    return LoggerCtx.SERVICE;
  }

  protected handleError(err: unknown) {
    if (this.logger) {
      this.logger.error(this.constructor.name, {
        err,
        context: this.loggerCtx,
      });
    }

    return new InternalServerErrorException();
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
