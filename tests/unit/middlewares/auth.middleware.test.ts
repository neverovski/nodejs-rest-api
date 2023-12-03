import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';

import { ROLE_ANONYMOUS } from '@common/constants';
import {
  TokenExpiredException,
  TokenNotProvidedException,
  TokenVerifyException,
} from '@common/exceptions';
import { IJwtConfig } from '@config';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { ITokenService } from '@providers/token';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  const nextFunction: NextFunction = jest.fn();
  const mockJwtConfig: IJwtConfig = {
    accessToken: {
      secret: 'access_secret',
      expiresIn: '30m',
    },
    refreshToken: {
      secret: 'refresh_secret',
      expiresIn: '1d',
    },
    token: {
      secret: 'token',
      expiresIn: '1h',
    },
  };
  const mockTokenService: ITokenService = {
    decodeJwt: jest.fn(),
    signJwt: jest.fn(),
    verifyJwt: jest.fn(),
  };

  beforeEach(() => {
    middleware = new AuthMiddleware(mockJwtConfig, mockTokenService);
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

    (mockTokenService.verifyJwt as jest.Mock).mockResolvedValue(payload);

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

    (mockTokenService.verifyJwt as jest.Mock).mockRejectedValue(
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

    (mockTokenService.verifyJwt as jest.Mock).mockRejectedValue(
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
