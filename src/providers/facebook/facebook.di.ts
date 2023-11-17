import { container } from 'tsyringe';

import { FacebookInject } from './facebook.enum';
import { FacebookService } from './facebook.service';
import { IFacebookService } from './interface';

export class FacebookDi {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<IFacebookService>(
      FacebookInject.SERVICE,
      new FacebookService(),
    );
  }
}
