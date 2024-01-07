import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';

import { HttpStatus } from '@common/enums';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@common/exceptions';
import { ErrorMiddleware } from '@middleware/error.middleware';

describe('ErrorMiddleware', () => {
  let middleware: ErrorMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    middleware = new ErrorMiddleware();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should respond with the error if it has a messageCode and statusCode', () => {
    const error = new NotFoundException();

    middleware.handler()(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { ...error } });
  });

  it('should respond with InternalServerErrorException if the error does not have a messageCode and statusCode', () => {
    const error = new Error('Test error');

    middleware.handler()(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: { ...new InternalServerErrorException(), message: error.message },
    });
  });
});
