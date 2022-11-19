import { Logger } from '@libs';
import { LoggerType } from '@utils';

export default class ServiceCore {
  protected handleError(error: unknown) {
    Logger.error({
      message: this.constructor.name,
      error,
      type: LoggerType.SERVER,
    });
  }

  protected init() {
    Logger.info({ message: `${this.constructor.name} initialized...` });
  }
}
