import { ITokenService } from '@providers/token';

export const tokenServiceMock: ITokenService = {
  decodeJwt: jest.fn(),
  signJwt: jest.fn(),
  verifyJwt: jest.fn(),
};
