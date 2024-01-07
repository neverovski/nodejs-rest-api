import { HttpStatus, MessageCode } from '@common/enums';
import { TokenVerifyException } from '@common/exceptions/token-verify.exception';
import { i18n } from '@i18n';

describe('TokenVerifyException', () => {
  it('should create an instance with default message', () => {
    const exception = new TokenVerifyException();

    expect(exception.message).toEqual(i18n()['exception.tokenVerify']);
    expect(exception.messageCode).toEqual(MessageCode.TOKEN_VERIFY);
    expect(exception.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
  });
});
