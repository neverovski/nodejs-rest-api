import { container } from 'tsyringe';

import { IRefreshTokenRepository, ITokenService } from './interface';
import { RefreshTokenRepository } from './repository';
import TokenService from './token.service';
import { TokenInject } from './token.type';

container.register<IRefreshTokenRepository>(
  TokenInject.TOKEN_REPOSITORY,
  RefreshTokenRepository,
);

container.register<ITokenService>(TokenInject.TOKEN_SERVICE, TokenService);
