import { container as Container } from 'tsyringe';

import { MiddlewareKey } from '@common/enums/middleware.enum';
import { IMiddleware } from '@common/interfaces';
import { DiCore } from '@core/service';

import { AsyncMiddleware } from './async.middleware';
import { AuthMiddleware } from './auth.middleware';
import { ErrorMiddleware } from './error.middleware';
import { InitMiddleware } from './init.middleware';
import { LoggerMiddleware } from './logger.middleware';
import { PrometheusMiddleware } from './prometheus.middleware';
import { UserSessionMiddleware } from './user-session.middleware';
import { ValidateMiddleware } from './validate.middleware';

class MiddlewareDi extends DiCore {
  register() {
    this.registerAsync();
    this.registerAuth();
    this.registerError();
    this.registerInit();
    this.registerLogger();
    this.registerPrometheus();
    this.registerUserSession();
    this.registerValidate();
  }

  private registerAsync() {
    Container.registerSingleton<IMiddleware>(
      MiddlewareKey.ASYNC,
      AsyncMiddleware,
    );
  }

  private registerAuth() {
    Container.registerSingleton<IMiddleware>(
      MiddlewareKey.AUTH,
      AuthMiddleware,
    );
  }

  private registerError() {
    Container.registerSingleton<IMiddleware>(
      MiddlewareKey.ERROR,
      ErrorMiddleware,
    );
  }

  private registerInit() {
    Container.registerSingleton<IMiddleware>(
      MiddlewareKey.INIT,
      InitMiddleware,
    );
  }

  private registerLogger() {
    Container.registerSingleton<IMiddleware>(
      MiddlewareKey.LOGGER,
      LoggerMiddleware,
    );
  }

  private registerPrometheus() {
    Container.registerSingleton<IMiddleware>(
      MiddlewareKey.PROMETHEUS,
      PrometheusMiddleware,
    );
  }

  private registerUserSession() {
    Container.registerSingleton<IMiddleware>(
      MiddlewareKey.USER_SESSION,
      UserSessionMiddleware,
    );
  }

  private registerValidate() {
    Container.registerSingleton<IMiddleware>(
      MiddlewareKey.VALIDATE,
      ValidateMiddleware,
    );
  }
}

new MiddlewareDi().register();
