import { HttpStatus, MessageCode } from '@common/enums';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message?: ExceptionMessage) {
    super({
      message: message || i18n()['exception.notFound'],
      messageCode: MessageCode.NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
