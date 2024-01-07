import { HttpStatus, MessageCode } from '@common/enums';
import { TokenMalformedException } from '@common/exceptions/token-malformed.exception';
import { i18n } from '@i18n';

describe('TokenMalformedException', () => {
  it('should create an instance with default message', () => {
    const exception = new TokenMalformedException();

    expect(exception.message).toEqual(i18n()['exception.tokenMalformed']);
    expect(exception.messageCode).toEqual(MessageCode.TOKEN_MALFORMED);
    expect(exception.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
  });
});
