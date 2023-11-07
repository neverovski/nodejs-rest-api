import { container } from 'tsyringe';

import { ITokenService } from './interface';
import { TokenInject } from './token.enum';
import { TokenService } from './token.service';

export class TokenDependencies {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<ITokenService>(
      TokenInject.SERVICE,
      new TokenService(),
    );
  }
}
