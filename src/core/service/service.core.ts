import { ILoggerService } from '@providers/logger';

export class ServiceCore {
  protected readonly logger?: ILoggerService;

  constructor() {
    this.init();
  }

  protected handleError(err: unknown) {
    if (!this.logger) {
      return;
    }

    this.logger.error(this.constructor.name, { err });
  }

  protected init() {
    if (!this.logger) {
      return;
    }

    this.logger.log(`${this.constructor.name} initialized...`);
  }
}
