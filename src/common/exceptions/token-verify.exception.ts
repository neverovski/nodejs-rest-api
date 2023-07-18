import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class TokenVerifyException extends HttpException {
  constructor() {
    super({
      messageCode: MessageCode.TOKEN_VERIFY,
      statusCode: HttpStatus.Unauthorized,
      message: i18n()['exception.tokenVerify'],
    });
  }
}
