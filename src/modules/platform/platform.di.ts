import { container } from 'tsyringe';

import { IPlatformService, IPlatformRepository } from './interface';
import PlatformRepository from './platform.repository';
import PlatformService from './platform.service';
import { PlatformInject } from './platform.type';

container.register<IPlatformService>(
  PlatformInject.PLATFORM_SERVICE,
  PlatformService,
);

container.register<IPlatformRepository>(
  PlatformInject.PLATFORM_REPOSITORY,
  PlatformRepository,
);
