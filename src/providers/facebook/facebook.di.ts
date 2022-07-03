import { container } from 'tsyringe';

import FacebookService from './facebook.service';
import { FacebookInject } from './facebook.type';
import { IFacebookService } from './interface';

container.registerSingleton<IFacebookService>(
  FacebookInject.FACEBOOK_SERVICE,
  FacebookService,
);
