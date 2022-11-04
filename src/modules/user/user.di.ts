import { container } from 'tsyringe';

import { IUserRepository, IUserService } from './interface';
import UserRepository from './user.repository';
import UserService from './user.service';
import { UserInject } from './user.type';

container.register<IUserRepository>(UserInject.USER_REPOSITORY, UserRepository);
container.register<IUserService>(UserInject.USER_SERVICE, UserService);
