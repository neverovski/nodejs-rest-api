import { HttpStatus, MessageCode } from '@common/enums';
import { TokenExpiredException } from '@common/exceptions/token-expired.exception';
import { i18n } from '@i18n';

describe('TokenExpiredException', () => {
  it('should create an instance with default message', () => {
    const exception = new TokenExpiredException();

    expect(exception.message).toEqual(i18n()['exception.tokenExpired']);
    expect(exception.messageCode).toEqual(MessageCode.TOKEN_EXPIRED);
    expect(exception.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
  });
});
