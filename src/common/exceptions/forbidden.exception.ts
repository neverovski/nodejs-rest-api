import { HttpStatus, MessageCode } from '@common/enums';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  constructor(message?: ExceptionMessage) {
    super({
      message: message || i18n()['exception.forbidden'],
      messageCode: MessageCode.FORBIDDEN,
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}
