import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { ITokenService } from './interface';
import { TokenInject } from './token.enum';
import { TokenService } from './token.service';

export class TokenDi extends DiCore {
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
