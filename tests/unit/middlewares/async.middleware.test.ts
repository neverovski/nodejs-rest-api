import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';

import { NotFoundException } from '@common/exceptions';
import { AsyncMiddleware } from '@middleware/async.middleware';

describe('AsyncMiddleware', () => {
  let middleware: AsyncMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    middleware = new AsyncMiddleware();
    mockRequest = {};
    mockResponse = {
      send: jest.fn(),
    };
  });

  it('should handle the request and response', async () => {
    const handler = middleware.handler(async (_req, res) => {
      await Promise.resolve();

      res.send('Hello World');
    });

    await handler(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.send).toHaveBeenCalledWith('Hello World');
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should call next function when an error is thrown', async () => {
    const handler = middleware.handler(async () => {
      await Promise.resolve();

      throw new Error('Test error');
    });

    await handler(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalledWith(new Error('Test error'));
  });

  it('should call next function when a notFoundException is thrown', async () => {
    const handler = middleware.handler(async () => {
      await Promise.resolve();

      throw new NotFoundException();
    });

    await handler(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalledWith(new NotFoundException());
  });
});
