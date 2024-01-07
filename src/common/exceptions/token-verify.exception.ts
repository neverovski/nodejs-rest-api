import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class TokenVerifyException extends HttpException {
  constructor() {
    super({
      message: i18n()['exception.tokenVerify'],
      messageCode: MessageCode.TOKEN_VERIFY,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
