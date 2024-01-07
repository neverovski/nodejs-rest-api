import { HttpStatus, MessageCode } from '@common/enums';
import { InternalServerErrorException } from '@common/exceptions/internal-server-error.exception';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

describe('InternalServerErrorException', () => {
  it('should create an instance with default message when no message is provided', () => {
    const exception = new InternalServerErrorException();

    expect(exception.messageCode).toEqual(MessageCode.INTERNAL_SERVER_ERROR);
    expect(exception.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.message).toEqual(i18n()['exception.serverError']);
  });

  it('should create an instance with the provided message', () => {
    const message = 'Test message';
    const exception = new InternalServerErrorException(message);

    expect(exception.messageCode).toEqual(MessageCode.INTERNAL_SERVER_ERROR);
    expect(exception.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.message).toEqual(message);
  });

  it('should create an instance with the provided message object', () => {
    const message: ExceptionMessage = [{ key: 'test', value: 'Test message' }];
    const exception = new InternalServerErrorException(message);

    expect(exception.messageCode).toEqual(MessageCode.INTERNAL_SERVER_ERROR);
    expect(exception.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.message).toEqual(message);
  });
});
