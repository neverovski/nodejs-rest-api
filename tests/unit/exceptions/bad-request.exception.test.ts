import { HttpStatus, MessageCode } from '@common/enums';
import { BadRequestException } from '@common/exceptions/bad-request.exception';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

describe('BadRequestException', () => {
  it('should create an instance with default message when no message is provided', () => {
    const exception = new BadRequestException();

    expect(exception.messageCode).toEqual(MessageCode.BAD_REQUEST);
    expect(exception.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(exception.message).toEqual(i18n()['exception.badRequest']);
  });

  it('should create an instance with the provided message', () => {
    const message = 'Test message';
    const exception = new BadRequestException(message);

    expect(exception.messageCode).toEqual(MessageCode.BAD_REQUEST);
    expect(exception.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(exception.message).toEqual(message);
  });

  it('should create an instance with the provided message object', () => {
    const message: ExceptionMessage = [{ key: 'test', value: 'Test message' }];
    const exception = new BadRequestException(message);

    expect(exception.messageCode).toEqual(MessageCode.BAD_REQUEST);
    expect(exception.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(exception.message).toEqual(message);
  });
});
