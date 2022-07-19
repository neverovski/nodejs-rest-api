import { container } from 'tsyringe';

import { IJwtService } from './interface';
import JwtService from './jwt.service';
import { JwtInject } from './jwt.type';

container.registerInstance<IJwtService>(
  JwtInject.JWT_SERVICE,
  new JwtService(),
);
