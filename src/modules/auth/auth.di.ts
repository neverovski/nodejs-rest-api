import { container } from 'tsyringe';

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

export class AuthDi {
  static init() {
    this.registerTokenService();
    this.registerService();
    this.registerSchema();
    this.registerController();
  }

  private static registerController() {
    container.register<IAuthController>(AuthInject.CONTROLLER, AuthController);
  }

  private static registerSchema() {
    container.registerSingleton<IAuthSchema>(AuthInject.SCHEMA, AuthSchema);
  }

  private static registerService() {
    container.register<IAuthService>(AuthInject.SERVICE, AuthService);
  }

  private static registerTokenService() {
    container.register<IAuthTokenService>(
      AuthInject.TOKEN_SERVICE,
      AuthTokenService,
    );
  }
}
