import { container } from 'tsyringe';

import {
  IUserController,
  IUserRepository,
  IUserSchema,
  IUserService,
  IUserValidatorService,
} from './interface';
import { UserRepository } from './repository';
import { UserService, UserValidatorService } from './service';
import { UserController } from './user.controller';
import { UserInject } from './user.enum';
import { UserSchema } from './user.schema';

export class UserDi {
  static init() {
    this.registerRepository();
    this.registerService();
    this.registerSchema();
    this.registerValidatorService();
    this.registerController();
  }

  private static registerController() {
    container.register<IUserController>(UserInject.CONTROLLER, UserController);
  }

  private static registerRepository() {
    container.register<IUserRepository>(UserInject.REPOSITORY, UserRepository);
  }

  private static registerSchema() {
    container.registerSingleton<IUserSchema>(UserInject.SCHEMA, UserSchema);
  }

  private static registerService() {
    container.register<IUserService>(UserInject.SERVICE, UserService);
  }

  private static registerValidatorService() {
    container.register<IUserValidatorService>(
      UserInject.SERVICE,
      UserValidatorService,
    );
  }
}
