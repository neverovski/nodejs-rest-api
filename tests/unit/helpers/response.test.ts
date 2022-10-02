import { expect } from 'chai';

import { HttpExceptionCore } from '@core';
import { CodeResponse, HttpException, HttpStatus } from '@utils';
import { ResponseHelper } from '@utils/helpers';

describe('ResponseHelper.error Function Test', () => {
  Object.values(HttpException).forEach((item: HttpException) => {
    const result = ResponseHelper.error(item);

    it(`Should return - ${CodeResponse[item].message}`, () => {
      expect(result).to.be.instanceOf(HttpExceptionCore);
      expect(result.message).to.be.equal(CodeResponse[item].message);
    });

    it(`Should return ${CodeResponse[item].code}`, () => {
      expect(result).to.be.instanceOf(HttpExceptionCore);
      expect(result.code).to.be.equal(CodeResponse[item].code);
    });

    it(`Should return ${CodeResponse[item].status}`, () => {
      expect(result).to.be.instanceOf(HttpExceptionCore);
      expect(result.status).to.be.equal(CodeResponse[item].status);
    });
  });
});

describe('ResponseHelper.success Function Test', () => {
  Object.values(HttpException).forEach((item: HttpException) => {
    const result = ResponseHelper.success(item);

    it(`Should return - ${CodeResponse[item].message}`, () => {
      expect(result.message).to.be.equal(CodeResponse[item].message);
    });

    it(`Should return ${CodeResponse[item].code}`, () => {
      expect(result.code).to.be.equal(CodeResponse[item].code);
    });

    it(`Should return ${CodeResponse[item].status}`, () => {
      expect(result.status).to.be.equal(CodeResponse[item].status);
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
