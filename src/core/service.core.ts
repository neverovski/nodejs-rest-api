import { Logger } from '@lib';
import { LoggerType } from '@utils';

export default class ServiceCore {
  /**
   * Empty list response
   *
   * @returns {Array}
   */
  protected emptyListResponse(): [] {
    return [];
  }

  protected errorHandler(error: unknown) {
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
