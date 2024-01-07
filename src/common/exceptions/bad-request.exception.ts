import { HttpStatus, MessageCode } from '@common/enums';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(message?: ExceptionMessage) {
    super({
      message: message || i18n()['exception.badRequest'],
      messageCode: MessageCode.BAD_REQUEST,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
