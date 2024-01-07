import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class TokenNotProvidedException extends HttpException {
  constructor() {
    super({
      message: i18n()['exception.tokenNotProvided'],
      messageCode: MessageCode.TOKEN_NOT_PROVIDED,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
