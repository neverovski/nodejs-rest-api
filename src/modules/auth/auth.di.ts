import { container } from 'tsyringe';

import { TokenInject, AuthInject } from './auth.type';
import {
  IAuthService,
  ITokenService,
  IRefreshTokenRepository,
} from './interface';
import { RefreshTokenRepository } from './repository';
import { AuthService, TokenService } from './service';

container.register<IAuthService>(AuthInject.AUTH_SERVICE, AuthService);
container.register<ITokenService>(TokenInject.TOKEN_SERVICE, TokenService);
container.register<IRefreshTokenRepository>(
  TokenInject.TOKEN_REPOSITORY,
  RefreshTokenRepository,
);
