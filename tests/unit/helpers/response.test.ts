import { expect } from 'chai';

import { HttpExceptionCore } from '@core';
import { HttpStatus, HttpException, CodeResponse } from '@utils';
import { ResponseHelper } from '@utils/helpers';

describe('ResponseHelper.error Function Test', () => {
  let message: string;
  let code: string;
  let status: number;

  let result: HttpExceptionCore;

  Object.values(HttpException).forEach((item) => {
    beforeEach(() => {
      message = CodeResponse[item].message;
      code = CodeResponse[item].code;
      status = CodeResponse[item].status;

      result = ResponseHelper.error(item);
    });

    it('Should return message', () => {
      expect(result).to.be.instanceOf(HttpExceptionCore);
      expect(result.message).to.be.equal(message);
    });

    it('Should return code', () => {
      expect(result).to.be.instanceOf(HttpExceptionCore);
      expect(result.code).to.be.equal(code);
    });

    it('Should return status', () => {
      expect(result).to.be.instanceOf(HttpExceptionCore);
      expect(result.status).to.be.equal(status);
    });
  });
});

describe('ResponseHelper.success Function Test', () => {
  let message: string;
  let code: string;
  let status: number;

  let result: HttpExceptionType;

  Object.values(HttpException).forEach((item) => {
    beforeEach(() => {
      message = CodeResponse[item].message;
      code = CodeResponse[item].code;
      status = CodeResponse[item].status;

      result = ResponseHelper.success(item);
    });

    it('Should return message', () => {
      expect(result.message).to.be.equal(message);
    });

    it('Should return code', () => {
      expect(result.code).to.be.equal(code);
    });

    it('Should return status', () => {
      expect(result.status).to.be.equal(status);
    });
  });
});

describe('ResponseHelper.custom Function Test', () => {
  it('Should return - { message: External service error, status: 500, code: EXTERNAL }', () => {
    const result = ResponseHelper.custom();

    expect(result).to.be.instanceOf(HttpExceptionCore);
    expect(result.message).to.be.equal(CodeResponse.EXTERNAL.message);
    expect(result.status).to.be.equal(CodeResponse.EXTERNAL.status);
    expect(result.code).to.be.equal(CodeResponse.EXTERNAL.code);
  });

  it('Should return - { message: Custom message, status: 500, code: EXTERNAL }', () => {
    const result = ResponseHelper.custom({ message: 'Custom message' });

    expect(result).to.be.instanceOf(HttpExceptionCore);
    expect(result.message).to.be.equal('Custom message');
    expect(result.status).to.be.equal(CodeResponse.EXTERNAL.status);
    expect(result.code).to.be.equal(CodeResponse.EXTERNAL.code);
  });

  it('Should return - { message: Custom message, status: 400, code: EXTERNAL }', () => {
    const result = ResponseHelper.custom({
      message: 'Custom message',
      status: HttpStatus.BadRequest,
    });

    expect(result).to.be.instanceOf(HttpExceptionCore);
    expect(result.message).to.be.equal('Custom message');
    expect(result.status).to.be.equal(HttpStatus.BadRequest);
    expect(result.code).to.be.equal(CodeResponse.EXTERNAL.code);
  });

  it('Should return - { message: External service error, status: 500, code: BAD_REQUEST }', () => {
    const result = ResponseHelper.custom({ code: HttpException.BAD_REQUEST });

    expect(result).to.be.instanceOf(HttpExceptionCore);
    expect(result.message).to.be.equal(CodeResponse.EXTERNAL.message);
    expect(result.status).to.be.equal(CodeResponse.EXTERNAL.status);
    expect(result.code).to.be.equal(HttpException.BAD_REQUEST);
  });
});
