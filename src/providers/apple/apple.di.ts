import { container } from 'tsyringe';

import { AppleInject } from './apple.enum';
import { AppleService } from './apple.service';
import { IAppleService } from './interface';

export class AppleDi {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<IAppleService>(
      AppleInject.SERVICE,
      container.resolve(AppleService),
    );
  }
}
