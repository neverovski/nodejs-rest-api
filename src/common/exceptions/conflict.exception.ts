import { HttpStatus, MessageCode } from '@common/enums';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  constructor(message?: ExceptionMessage) {
    super({
      messageCode: MessageCode.FORBIDDEN,
      statusCode: HttpStatus.Forbidden,
      message: message || i18n()['exception.conflict'],
    });
  }
}
