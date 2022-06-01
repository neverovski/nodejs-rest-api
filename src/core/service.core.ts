import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

export default class ServiceCore {
  /**
   * Empty list response
   *
   * @returns {Array}
   */
  protected emptyListResponse(): [] {
    return [];
  }

  protected errorHandler(error: Error, code?: HttpException) {
    if (
      code &&
      (error?.name === 'EntityNotFound' ||
        error?.name === 'EntityNotFoundError')
    ) {
      return ResponseHelper.error(code);
    }

    return error;
  }
}
