import { container } from 'tsyringe';

import { IUserService, IUserRepository } from './interface';
import UserRepository from './user.repository';
import UserService from './user.service';
import { UserInject } from './user.type';

container.register<IUserService>(UserInject.USER_SERVICE, UserService);
container.register<IUserRepository>(UserInject.USER_REPOSITORY, UserRepository);
