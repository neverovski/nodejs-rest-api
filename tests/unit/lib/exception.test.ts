import { expect } from 'chai';

import {
  CODE_RESPONSE,
  Exception,
  HttpCode,
  HttpStatus,
} from '../../../src/lib';

describe('Exception.getError Function Test', () => {
  Object.values(HttpCode).forEach((item: HttpCode) => {
    const result = Exception.getError(item);

    expect(result.code).to.be.equal(CODE_RESPONSE[item].code);
    expect(result.status).to.be.equal(CODE_RESPONSE[item].status);
  });
});

describe('Exception.getOk Function Test', () => {
  Object.values(HttpCode).forEach((item: HttpCode) => {
    const result = Exception.getOk(item);

    expect(result.code).to.be.equal(CODE_RESPONSE[item].code);
    expect(result.status).to.be.equal(CODE_RESPONSE[item].status);
  });
});

describe('Exception.custom Function Test', () => {
  it('Should return - { message: External service error, status: 500, code: EXTERNAL }', () => {
    const result = Exception.getError(HttpCode.EXTERNAL);

    expect(result.status).to.be.equal(CODE_RESPONSE.EXTERNAL.status);
    expect(result.code).to.be.equal(CODE_RESPONSE.EXTERNAL.code);
  });

  it('Should return - { message: Custom message, status: 500, code: EXTERNAL }', () => {
    const message = 'Custom message';
    const result = Exception.getError(HttpCode.EXTERNAL, {
      message,
    });

    expect(result.message).to.be.equal(message);
    expect(result.status).to.be.equal(CODE_RESPONSE.EXTERNAL.status);
    expect(result.code).to.be.equal(CODE_RESPONSE.EXTERNAL.code);
  });

  it('Should return - { message: Custom message, status: 400, code: EXTERNAL }', () => {
    const message = 'Custom message';
    const result = Exception.getError(HttpCode.EXTERNAL, {
      message: message,
      status: HttpStatus.BadRequest,
    });

    expect(result.message).to.be.equal(message);
    expect(result.status).to.be.equal(HttpStatus.BadRequest);
    expect(result.code).to.be.equal(CODE_RESPONSE.EXTERNAL.code);
  });

  it('Should return - { message: External service error, status: 500, code: BAD_REQUEST }', () => {
    const result = Exception.getError(HttpCode.EXTERNAL, {
      code: HttpCode.BAD_REQUEST,
    });

    expect(result.status).to.be.equal(CODE_RESPONSE.EXTERNAL.status);
    expect(result.code).to.be.equal(HttpCode.BAD_REQUEST);
  });
});
