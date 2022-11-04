import { container } from 'tsyringe';

import { IPlatformRepository, IPlatformService } from './interface';
import PlatformRepository from './platform.repository';
import PlatformService from './platform.service';
import { PlatformInject } from './platform.type';

container.registerSingleton<IPlatformRepository>(
  PlatformInject.PLATFORM_REPOSITORY,
  PlatformRepository,
);

container.register<IPlatformService>(
  PlatformInject.PLATFORM_SERVICE,
  PlatformService,
);
