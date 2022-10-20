import { expect } from 'chai';

import { HttpExceptionCore } from '@core';
import { CodeResponse, HttpException, HttpStatus } from '@utils';
import { ExceptionHelper } from '@utils/helpers';

describe('ResponseHelper.getError Function Test', () => {
  Object.values(HttpException).forEach((item: HttpException) => {
    const result = ExceptionHelper.getError(item);

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

describe('ResponseHelper.getOk Function Test', () => {
  Object.values(HttpException).forEach((item: HttpException) => {
    const result = ExceptionHelper.getOk(item);

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
    const result = ExceptionHelper.getError(HttpException.EXTERNAL);

    expect(result).to.be.instanceOf(HttpExceptionCore);
    expect(result.status).to.be.equal(CodeResponse.EXTERNAL.status);
    expect(result.code).to.be.equal(CodeResponse.EXTERNAL.code);
  });

  it('Should return - { message: Custom message, status: 500, code: EXTERNAL }', () => {
    const result = ExceptionHelper.getError(HttpException.EXTERNAL, {
      message: 'Custom message',
    });

    expect(result).to.be.instanceOf(HttpExceptionCore);
    expect(result.message).to.be.equal('Custom message');
    expect(result.status).to.be.equal(CodeResponse.EXTERNAL.status);
    expect(result.code).to.be.equal(CodeResponse.EXTERNAL.code);
  });

  it('Should return - { message: Custom message, status: 400, code: EXTERNAL }', () => {
    const result = ExceptionHelper.getError(HttpException.EXTERNAL, {
      message: 'Custom message',
      status: HttpStatus.BadRequest,
    });

    expect(result).to.be.instanceOf(HttpExceptionCore);
    expect(result.message).to.be.equal('Custom message');
    expect(result.status).to.be.equal(HttpStatus.BadRequest);
    expect(result.code).to.be.equal(CodeResponse.EXTERNAL.code);
  });

  it('Should return - { message: External service error, status: 500, code: BAD_REQUEST }', () => {
    const result = ExceptionHelper.getError(HttpException.EXTERNAL, {
      code: HttpException.BAD_REQUEST,
    });

    expect(result).to.be.instanceOf(HttpExceptionCore);
    expect(result.status).to.be.equal(CodeResponse.EXTERNAL.status);
    expect(result.code).to.be.equal(HttpException.BAD_REQUEST);
  });
});
