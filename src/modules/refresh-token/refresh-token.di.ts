import { container as Container } from 'tsyringe';

import {
  IRefreshTokenRepository,
  IRefreshTokenService,
  IRefreshTokenValidatorService,
} from './interface';
import { RefreshTokenInject } from './refresh-token.enum';
import { RefreshTokenRepository } from './repository';
import { RefreshTokenService, RefreshTokenValidatorService } from './service';

export class RefreshTokenDi {
  register() {
    this.registerRepository();
    this.registerValidatorService();
    this.registerService();
  }

  private registerRepository() {
    Container.registerSingleton<IRefreshTokenRepository>(
      RefreshTokenInject.REPOSITORY,
      RefreshTokenRepository,
    );
  }

  private registerService() {
    Container.register<IRefreshTokenService>(
      RefreshTokenInject.SERVICE,
      RefreshTokenService,
    );
  }

  private registerValidatorService() {
    Container.register<IRefreshTokenValidatorService>(
      RefreshTokenInject.VALIDATOR_SERVICE,
      RefreshTokenValidatorService,
    );
  }
}
