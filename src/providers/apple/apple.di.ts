import { container } from 'tsyringe';

import AppleService from './apple.service';
import { AppleInject } from './apple.type';
import { IAppleService } from './interface';

container.registerSingleton<IAppleService>(
  AppleInject.APPLE_SERVICE,
  AppleService,
);
