import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { GoogleInject } from './google.enum';
import { GoogleService } from './google.service';
import { IGoogleService } from './interface';

export class GoogleDi extends DiCore {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.registerSingleton<IGoogleService>(
      GoogleInject.SERVICE,
      GoogleService,
    );
  }
}
