import { container } from 'tsyringe';

import {
  IUserRepository,
  IUserSchema,
  IUserService,
  IUserValidatorService,
} from './interface';
import { UserRepository } from './repository';
import { UserService, UserValidatorService } from './service';
import { UserInject } from './user.enum';
import { UserSchema } from './user.schema';

export class UserDependencies {
  static init() {
    this.registerRepository();
    this.registerService();
    this.registerSchema();
    this.registerValidatorService();
  }

  private static registerRepository() {
    container.register<IUserRepository>(UserInject.REPOSITORY, UserRepository);
  }

  private static registerSchema() {
    container.register<IUserSchema>(UserInject.SCHEMA, UserSchema);
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
