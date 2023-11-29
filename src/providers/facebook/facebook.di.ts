import { container as Container } from 'tsyringe';

import { FacebookInject } from './facebook.enum';
import { FacebookService } from './facebook.service';
import { IFacebookService } from './interface';

export class FacebookDi {
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
