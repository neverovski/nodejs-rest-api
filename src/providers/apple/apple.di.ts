import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { AppleInject } from './apple.enum';
import { AppleService } from './apple.service';
import { IAppleService } from './interface';

export class AppleDi extends DiCore {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.registerSingleton<IAppleService>(
      AppleInject.SERVICE,
      AppleService,
    );
  }
}
