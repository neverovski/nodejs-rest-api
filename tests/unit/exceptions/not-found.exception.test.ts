import { HttpStatus, MessageCode } from '@common/enums';
import { NotFoundException } from '@common/exceptions/not-found.exception';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

describe('NotFoundException', () => {
  it('should create an instance with default message when no message is provided', () => {
    const exception = new NotFoundException();

    expect(exception.messageCode).toEqual(MessageCode.NOT_FOUND);
    expect(exception.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(exception.message).toEqual(i18n()['exception.notFound']);
  });

  it('should create an instance with the provided message', () => {
    const message = 'Test message';
    const exception = new NotFoundException(message);

    expect(exception.messageCode).toEqual(MessageCode.NOT_FOUND);
    expect(exception.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(exception.message).toEqual(message);
  });

  it('should create an instance with the provided message object', () => {
    const message: ExceptionMessage = [{ key: 'test', value: 'Test message' }];
    const exception = new NotFoundException(message);

    expect(exception.messageCode).toEqual(MessageCode.NOT_FOUND);
    expect(exception.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(exception.message).toEqual(message);
  });
});
