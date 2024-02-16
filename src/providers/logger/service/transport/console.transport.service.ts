import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey, LogLevel } from '@common/enums';
import { IAppConfig, ILoggerConfig } from '@config';

import { ILoggerTransportServiceInterface } from '../../interface';
import { PRETTY_PRINT, SETTING_PINO } from '../../logger.constant';

@Singleton()
export class ConsoleTransportService
  implements ILoggerTransportServiceInterface
{
  constructor(
    @Inject(ConfigKey.APP)
    private readonly appConfig: IAppConfig,
    @Inject(ConfigKey.LOGGER)
    private readonly loggerConfig: ILoggerConfig,
  ) {}

  get options() {
    return {
      ...SETTING_PINO,
      level: LogLevel.TRACE,
      name: this.appConfig.name,
      enabled: this.loggerConfig.enabled,
      transport: {
        target: 'pino-pretty',
        options: { destination: 1, ...PRETTY_PRINT },
      },
    };
  }
}
