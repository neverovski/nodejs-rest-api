import { IJwtConfig } from '@config';

export const jwtConfigMock: IJwtConfig = {
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
