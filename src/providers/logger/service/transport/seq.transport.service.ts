import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey, LogLevel } from '@common/enums';
import { IAppConfig, ILoggerConfig } from '@config';

import { ILoggerTransportServiceInterface } from '../../interface';
import { SETTING_PINO } from '../../logger.constant';

@Singleton()
export class SeqTransportService implements ILoggerTransportServiceInterface {
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
        target: '@autotelic/pino-seq-transport',
        options: {
          loggerOpts: {
            serverUrl: this.loggerConfig.url,
            apiKey: this.loggerConfig.apiKey,
          },
        },
      },
    };
  }
}
