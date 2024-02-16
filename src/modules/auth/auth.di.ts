import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { AuthController } from './auth.controller';
import { AuthInject } from './auth.enum';
import { AuthSchema } from './auth.schema';
import {
  IAuthController,
  IAuthSchema,
  IAuthService,
  IAuthTokenService,
} from './interface';
import { AuthService, AuthTokenService } from './service';

export class AuthDi extends DiCore {
  register() {
    this.registerTokenService();
    this.registerService();
    this.registerSchema();
    this.registerController();
  }

  private registerController() {
    Container.registerSingleton<IAuthController>(
      AuthInject.CONTROLLER,
      AuthController,
    );
  }

  private registerSchema() {
    Container.registerSingleton<IAuthSchema>(AuthInject.SCHEMA, AuthSchema);
  }

  private registerService() {
    Container.register<IAuthService>(AuthInject.SERVICE, AuthService);
  }

  private registerTokenService() {
    Container.register<IAuthTokenService>(
      AuthInject.TOKEN_SERVICE,
      AuthTokenService,
    );
  }
}
