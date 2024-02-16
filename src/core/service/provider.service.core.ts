import { InternalServerErrorException } from '@common/exceptions';
import type { ILoggerService } from '@providers/logger';

export class ProviderServiceCore {
  protected readonly logger?: ILoggerService;

  constructor() {
    this.init();
  }

  protected handleError(err: unknown) {
    if (this.logger) {
      this.logger.error(this.constructor.name, { err });
    }

    return new InternalServerErrorException();
  }

  protected init() {
    if (!this.logger) {
      return;
    }

    this.logger.log(`${this.constructor.name} initialized...`);
  }
}
