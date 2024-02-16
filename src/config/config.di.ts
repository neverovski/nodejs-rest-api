import { container as Container } from 'tsyringe';

import { ConfigKey } from '@common/enums';
import { DiCore } from '@core/service';

import { AppConfig } from './app.config';
import { DatabaseConfig } from './database.config';
import { EmailConfig } from './email.config';
import {
  IAppConfig,
  IDatabaseConfig,
  IEmailConfig,
  IJwtConfig,
  ILoggerConfig,
  IPlatformConfig,
  IRedisConfig,
} from './interface';
import { JwtConfig } from './jwt.config';
import { LoggerConfig } from './logger.config';
import { PlatformConfig } from './platform.config';
import { RedisConfig } from './redis.config';

class ConfigDi extends DiCore {
  register() {
    this.registerApp();
    this.registerDatabase();
    this.registerEmail();
    this.registerJwt();
    this.registerLogger();
    this.registerPlatform();
    this.registerRedis();
  }

  private registerApp() {
    Container.registerSingleton<IAppConfig>(ConfigKey.APP, AppConfig);
  }

  private registerDatabase() {
    Container.registerSingleton<IDatabaseConfig>(
      ConfigKey.DATABASE,
      DatabaseConfig,
    );
  }

  private registerEmail() {
    Container.registerSingleton<IEmailConfig>(ConfigKey.EMAIL, EmailConfig);
  }

  private registerJwt() {
    Container.registerSingleton<IJwtConfig>(ConfigKey.JWT, JwtConfig);
  }

  private registerLogger() {
    Container.registerSingleton<ILoggerConfig>(ConfigKey.LOGGER, LoggerConfig);
  }

  private registerPlatform() {
    Container.registerSingleton<IPlatformConfig>(
      ConfigKey.PLATFORM,
      PlatformConfig,
    );
  }

  private registerRedis() {
    Container.registerSingleton<IRedisConfig>(ConfigKey.REDIS, RedisConfig);
  }
}

new ConfigDi().register();
