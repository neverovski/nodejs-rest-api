import { HttpStatus, MessageCode } from '@common/enums';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class UnprocessableEntityException extends HttpException {
  constructor(message?: ExceptionMessage) {
    super({
      message: message || i18n()['exception.unprocessableEntity'],
      messageCode: MessageCode.UNPROCESSABLE_ENTITY,
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
