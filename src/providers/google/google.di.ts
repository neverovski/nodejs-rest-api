import { container } from 'tsyringe';

import { GoogleInject } from './google.enum';
import { GoogleService } from './google.service';
import { IGoogleService } from './interface';

export class GoogleDependencies {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<IGoogleService>(
      GoogleInject.SERVICE,
      new GoogleService(),
    );
  }
}
