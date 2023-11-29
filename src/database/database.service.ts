import './typeorm/polyfill';

import { inject as Inject, singleton as Singleton } from 'tsyringe';
import { DataSource } from 'typeorm';

import { ConfigKey } from '@common/enums';
import { IAppConfig, IDatabaseConfig, IRedisConfig } from '@config';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { IDatabaseService } from './interface';
import { AppDataSource } from './typeorm/data-source';

@Singleton()
export class DatabaseService implements IDatabaseService {
  private readonly _dataSource: DataSource;

  constructor(
    @Inject(ConfigKey.APP) readonly appConfig: IAppConfig,
    @Inject(ConfigKey.DATABASE) readonly databaseConfig: IDatabaseConfig,
    @Inject(LoggerInject.SERVICE) readonly loggerService: ILoggerService,
    @Inject(ConfigKey.REDIS) readonly redisConfig: IRedisConfig,
  ) {
    this._dataSource = AppDataSource(
      appConfig,
      databaseConfig,
      loggerService,
      redisConfig,
    );
  }

  get dataSource() {
    return this._dataSource;
  }

  connect(): Promise<DataSource> {
    return this._dataSource.initialize();
  }
}
