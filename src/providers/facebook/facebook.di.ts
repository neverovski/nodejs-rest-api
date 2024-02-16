import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { FacebookInject } from './facebook.enum';
import { FacebookService } from './facebook.service';
import { IFacebookService } from './interface';

export class FacebookDi extends DiCore {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.registerSingleton<IFacebookService>(
      FacebookInject.SERVICE,
      FacebookService,
    );
  }
}
