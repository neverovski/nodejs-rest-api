import { container } from 'tsyringe';

import AuthService from './auth.service';
import { AuthInject } from './auth.type';
import { IAuthService } from './interface';

container.register<IAuthService>(AuthInject.AUTH_SERVICE, AuthService);
