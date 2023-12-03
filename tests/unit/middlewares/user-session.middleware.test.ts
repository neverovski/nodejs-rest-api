import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';

import { IpUtil, UrlUtil, UserAgetUtil } from '@common/utils';
import { UserSessionMiddleware } from '@middleware/user-session.middleware';

describe('UserSessionMiddleware', () => {
  let middleware: UserSessionMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    middleware = new UserSessionMiddleware();
    mockRequest = {
      headers: {
        'user-agent': 'test-agent',
        origin: 'http://test.com',
      },
    };
    mockResponse = {};
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set userSession on the request', () => {
    const ip = '127.0.0.1';
    const os = 'test-os';
    const browser = 'test-browser';
    const domain = 'test.com';
    const userAgent = 'test-agent';

    jest.spyOn(IpUtil, 'getIp').mockReturnValue(ip);
    jest.spyOn(UserAgetUtil, 'getOS').mockReturnValue(os);
    jest.spyOn(UserAgetUtil, 'getBrowser').mockReturnValue(browser);
    jest.spyOn(UrlUtil, 'getDomain').mockReturnValue(domain);

    middleware.handler()(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockRequest.userSession).toEqual({
      os,
      ip,
      browser,
      domain,
      userAgent,
    });
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should set userSession with default values if no headers are provided', () => {
    mockRequest.headers = {};

    middleware.handler()(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockRequest.userSession).toEqual({
      os: '',
      ip: null,
      browser: '',
      domain: 'localhost',
      userAgent: '',
    });
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should set userSession with default values if user-agent and origin headers are undefined', () => {
    mockRequest.headers = {
      'user-agent': undefined,
      origin: undefined,
    };

    middleware.handler()(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockRequest.userSession).toEqual({
      os: '',
      ip: null,
      browser: '',
      domain: 'localhost',
      userAgent: '',
    });
    expect(nextFunction).toHaveBeenCalled();
  });
});
