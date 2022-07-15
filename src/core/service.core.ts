import { LoggerType } from '@utils';

import { Logger } from './logger';

export default class ServiceCore {
  /**
   * Empty list response
   *
   * @returns {Array}
   */
  protected emptyListResponse(): [] {
    return [];
  }

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
