import { HttpStatus, MessageCode } from '@common/enums';
import { HttpException } from '@common/exceptions/http.exception';
import { i18n } from '@i18n';

describe('HttpException', () => {
  it('should create an instance with default values when no parameters are provided', () => {
    const exception = new HttpException();

    expect(exception.message).toEqual(i18n()['exception.serverError']);
    expect(exception.messageCode).toEqual(MessageCode.INTERNAL_SERVER_ERROR);
    expect(exception.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should create an instance with the provided parameters', () => {
    const message = 'Test message';
    const messageCode = MessageCode.BAD_REQUEST;
    const statusCode = HttpStatus.BAD_REQUEST;

    const exception = new HttpException({ message, messageCode, statusCode });

    expect(exception.message).toEqual(message);
    expect(exception.messageCode).toEqual(messageCode);
    expect(exception.statusCode).toEqual(statusCode);
  });

  it('should create an instance with the provided message object', () => {
    const message = [{ key: 'test', value: 'Test message' }];
    const messageCode = MessageCode.BAD_REQUEST;
    const statusCode = HttpStatus.BAD_REQUEST;

    const exception = new HttpException({ message, messageCode, statusCode });

    expect(exception.message).toEqual(message);
    expect(exception.messageCode).toEqual(messageCode);
    expect(exception.statusCode).toEqual(statusCode);
  });
});
