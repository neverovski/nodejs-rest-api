import { container as Container } from 'tsyringe';

import { ITokenService } from './interface';
import { TokenInject } from './token.enum';
import { TokenService } from './token.service';

export class TokenDi {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.registerSingleton<ITokenService>(
      TokenInject.SERVICE,
      TokenService,
    );
  }
}
