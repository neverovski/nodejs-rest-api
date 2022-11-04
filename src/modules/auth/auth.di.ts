import { container } from 'tsyringe';

import { AuthInject, TokenInject } from './auth.type';
import {
  IAuthService,
  IRefreshTokenRepository,
  ITokenService,
} from './interface';
import { RefreshTokenRepository } from './repository';
import { AuthService, TokenService } from './service';

container.register<IRefreshTokenRepository>(
  TokenInject.TOKEN_REPOSITORY,
  RefreshTokenRepository,
);

container.register<IAuthService>(AuthInject.AUTH_SERVICE, AuthService);
container.register<ITokenService>(TokenInject.TOKEN_SERVICE, TokenService);
