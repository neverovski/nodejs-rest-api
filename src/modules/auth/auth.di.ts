import { container } from 'tsyringe';

import { IAuthService, ITokenService } from './interface';
import { AuthService, TokenService } from './service';

container.register<IAuthService>('AuthService', AuthService);
container.register<ITokenService>('TokenService', TokenService);
