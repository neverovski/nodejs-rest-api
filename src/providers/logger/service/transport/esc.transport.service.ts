import escFormat from '@elastic/ecs-pino-format';
import pinoElasticsearch from 'pino-elasticsearch';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey, LogLevel } from '@common/enums';
import { IAppConfig, ILoggerConfig } from '@config';

import { ILoggerStreamTransportServiceInterface } from '../../interface';
import { LOGGER_SEARCH_INDEX, SETTING_PINO } from '../../logger.constant';

@Singleton()
export class EscTransportService
  implements ILoggerStreamTransportServiceInterface
{
  constructor(
    @Inject(ConfigKey.APP)
    private readonly appConfig: IAppConfig,
    @Inject(ConfigKey.LOGGER)
    private readonly loggerConfig: ILoggerConfig,
  ) {}

  get options() {
    const format = escFormat();

    return {
      options: {
        ...SETTING_PINO,
        level: LogLevel.TRACE,
        name: this.appConfig.name,
        enabled: this.loggerConfig.enabled,
        ...format,
      },
      stream: pinoElasticsearch({
        index: (logTime) => {
          return `${LOGGER_SEARCH_INDEX}-${logTime.substring(5, 10)}`;
        },
        node: this.loggerConfig.url,
        esVersion: 8,
        flushBytes: 1000,
        auth: { apiKey: this.loggerConfig.apiKey as string },
        ...(this.loggerConfig?.ssl?.ca && {
          tls: {
            ca: this.loggerConfig.ssl.ca,
            rejectUnauthorized: false,
          },
        }),
        opType: 'create',
      }),
    };
  }
}
