import { container } from 'tsyringe';

import { IRefreshTokenRepository, IRefreshTokenService } from './interface';
import { RefreshTokenInject } from './refresh-token.enum';
import { RefreshTokenRepository } from './repository';
import { RefreshTokenService } from './service/refresh-token.service';

export class RefreshTokenDi {
  static init() {
    this.registerRepository();
    this.registerService();
  }

  private static registerRepository() {
    container.register<IRefreshTokenRepository>(
      RefreshTokenInject.REPOSITORY,
      RefreshTokenRepository,
    );
  }

  private static registerService() {
    container.register<IRefreshTokenService>(
      RefreshTokenInject.SERVICE,
      RefreshTokenService,
    );
  }
}
