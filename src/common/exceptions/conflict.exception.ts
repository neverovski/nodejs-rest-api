import { HttpStatus, MessageCode } from '@common/enums';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  constructor(message?: ExceptionMessage) {
    super({
      message: message || i18n()['exception.conflict'],
      messageCode: MessageCode.CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
