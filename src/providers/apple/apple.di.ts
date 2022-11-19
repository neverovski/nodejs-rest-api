import { container } from 'tsyringe';

import AppleService from './apple.service';
import { AppleInject } from './apple.type';
import { IAppleService } from './interface';

container.registerInstance<IAppleService>(
  AppleInject.APPLE_SERVICE,
  new AppleService(),
);
