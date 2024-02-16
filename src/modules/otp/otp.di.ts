import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import {
  IOtpCodeRepository,
  IOtpService,
  IOtpValidatorService,
} from './interface';
import { OtpInject } from './otp.enum';
import { OtpCodeRepository } from './repository';
import { OtpService, OtpValidatorService } from './service';

export class OtpDi extends DiCore {
  register() {
    this.registerRepository();
    this.registerService();
    this.registerValidatorService();
  }

  private registerRepository() {
    Container.registerSingleton<IOtpCodeRepository>(
      OtpInject.CODE_REPOSITORY,
      OtpCodeRepository,
    );
  }

  private registerService() {
    Container.register<IOtpService>(OtpInject.SERVICE, OtpService);
  }

  private registerValidatorService() {
    Container.register<IOtpValidatorService>(
      OtpInject.VALIDATOR_SERVICE,
      OtpValidatorService,
    );
  }
}
