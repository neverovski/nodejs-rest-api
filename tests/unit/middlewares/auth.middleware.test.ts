import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';

import { ROLE_ANONYMOUS } from '@common/constants';
import {
  TokenExpiredException,
  TokenNotProvidedException,
  TokenVerifyException,
} from '@common/exceptions';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { jwtConfigMock } from '__mocks__/jwt.config.mock';
import { tokenServiceMock } from '__mocks__/token.service.mock';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    middleware = new AuthMiddleware(jwtConfigMock, tokenServiceMock);
    mockRequest = {
      headers: {},
      cookies: {},
    };
    mockResponse = {};
  });

  it('should set user to anonymous role if no token is provided', () => {
    middleware.handler()(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    const expectedUser: UserPayload = { userId: 0, role: ROLE_ANONYMOUS };

    expect(mockRequest.user).toEqual(expectedUser);
    expect(nextFunction).toHaveBeenCalledWith(new TokenNotProvidedException());
  });

  it('should set user to the payload of the verified token if token is provided', async () => {
    const token = 'accessToken';
    const user = { userId: 1, email: 'test@test.com', role: 'user' };
    const payload: AccessTokenPayload = {
      ...user,
      jti: '0',
      sub: 10,
      typ: 'access',
    };

    mockRequest.headers = {
      ...mockRequest.headers,
      authorization: `Bearer ${token}`,
    };

    (tokenServiceMock.verifyJwt as jest.Mock).mockResolvedValue(payload);

    await Promise.resolve(
      middleware.handler()(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      ),
    );

    expect(mockRequest.user).toEqual(user);
    expect(nextFunction).toHaveBeenCalledWith();
  });

  it('should throw an error if token is not in the correct format', async () => {
    const token = 'invalidTokenFormat';

    mockRequest.headers = {
      ...mockRequest.headers,
      authorization: token,
    };

    await Promise.resolve(
      middleware.handler()(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      ),
    );

    expect(nextFunction).toHaveBeenCalledWith(new TokenNotProvidedException());
  });

  it('should call next function with error if token verification fails', async () => {
    const token = 'tokenVerifyException';

    mockRequest.headers = {
      ...mockRequest.headers,
      authorization: `Bearer ${token}`,
    };

    (tokenServiceMock.verifyJwt as jest.Mock).mockRejectedValue(
      new TokenVerifyException(),
    );

    await Promise.resolve(
      middleware.handler()(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      ),
    );

    expect(nextFunction).toHaveBeenCalledWith(new TokenVerifyException());
  });

  it('should throw an error if token is expired', async () => {
    const token = 'tokenExpiredException';

    mockRequest.headers = {
      ...mockRequest.headers,
      authorization: `Bearer ${token}`,
    };

    (tokenServiceMock.verifyJwt as jest.Mock).mockRejectedValue(
      new TokenExpiredException(),
    );

    await Promise.resolve(
      middleware.handler()(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      ),
    );

    expect(nextFunction).toHaveBeenCalledWith(new TokenExpiredException());
  });
});
