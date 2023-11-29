import { container as Container } from 'tsyringe';

import { GoogleInject } from './google.enum';
import { GoogleService } from './google.service';
import { IGoogleService } from './interface';

export class GoogleDi {
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
