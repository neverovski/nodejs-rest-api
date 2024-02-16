import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import {
  ILoggerService,
  ILoggerStreamTransportServiceInterface,
  ILoggerTransportServiceInterface,
} from './interface';
import { LoggerInject } from './logger.enum';
import { LoggerService } from './service';
import {
  ConsoleTransportService,
  EscTransportService,
  SeqTransportService,
} from './service/transport';

export class LoggerDi extends DiCore {
  register() {
    this.registerConsoleTransportService();
    this.registerEscTransportService();
    this.registerSeqTransportService();

    this.registerService();
  }

  private registerConsoleTransportService() {
    Container.registerSingleton<ILoggerTransportServiceInterface>(
      LoggerInject.CONSOLE_TRANSPORT_SERVICE,
      ConsoleTransportService,
    );
  }

  private registerEscTransportService() {
    Container.registerSingleton<ILoggerStreamTransportServiceInterface>(
      LoggerInject.ESC_TRANSPORT_SERVICE,
      EscTransportService,
    );
  }

  private registerSeqTransportService() {
    Container.registerSingleton<ILoggerTransportServiceInterface>(
      LoggerInject.SEQ_TRANSPORT_SERVICE,
      SeqTransportService,
    );
  }

  private registerService() {
    Container.registerSingleton<ILoggerService>(
      LoggerInject.SERVICE,
      LoggerService,
    );
  }
}
