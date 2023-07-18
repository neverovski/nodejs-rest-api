import { LoggerType } from '@common/enums';
import { Logger } from '@providers/logger';

export class ServiceCore {
  protected handleError(error: unknown) {
    Logger.error(error, {
      name: this.constructor.name,
      type: LoggerType.SERVICE,
    });
  }

  protected init() {
    Logger.debug(`${this.constructor.name} initialized...`, {
      type: LoggerType.SERVICE,
    });
  }
}
