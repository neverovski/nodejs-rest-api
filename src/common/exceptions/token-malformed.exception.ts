import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class TokenMalformedException extends HttpException {
  constructor() {
    super({
      message: i18n()['exception.tokenMalformed'],
      messageCode: MessageCode.TOKEN_MALFORMED,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
