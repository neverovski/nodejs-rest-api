import { container } from 'tsyringe';

import { IUserService } from './interface';
import UserService from './user.service';

container.register<IUserService>('UserService', UserService);
