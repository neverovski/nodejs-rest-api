import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import {
  IProfileRepository,
  IUserController,
  IUserRepository,
  IUserSchema,
  IUserService,
  IUserValidatorService,
} from './interface';
import { UserRepository } from './repository';
import { ProfileRepository } from './repository/profile.repository';
import { UserService, UserValidatorService } from './service';
import { UserController } from './user.controller';
import { UserInject } from './user.enum';
import { UserSchema } from './user.schema';

export class UserDi extends DiCore {
  register() {
    this.registerRepositoryProfile();
    this.registerRepository();
    this.registerService();
    this.registerSchema();
    this.registerValidatorService();
    this.registerController();
  }

  private registerController() {
    Container.registerSingleton<IUserController>(
      UserInject.CONTROLLER,
      UserController,
    );
  }

  private registerRepository() {
    Container.registerSingleton<IUserRepository>(
      UserInject.REPOSITORY,
      UserRepository,
    );
  }

  private registerRepositoryProfile() {
    Container.registerSingleton<IProfileRepository>(
      UserInject.PROFILE_REPOSITORY,
      ProfileRepository,
    );
  }

  private registerSchema() {
    Container.registerSingleton<IUserSchema>(UserInject.SCHEMA, UserSchema);
  }

  private registerService() {
    Container.register<IUserService>(UserInject.SERVICE, UserService);
  }

  private registerValidatorService() {
    Container.register<IUserValidatorService>(
      UserInject.VALIDATOR_SERVICE,
      UserValidatorService,
    );
  }
}
