import { container } from 'tsyringe';

import { IJwtService } from './interface';
import JwtService from './jwt.service';
import { JwtInject } from './jwt.type';

container.registerSingleton<IJwtService>(JwtInject.JWT_SERVICE, JwtService);
