import type { RequestHandler } from 'express';
import promBundle from 'express-prom-bundle';
import { Registry } from 'prom-client';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey } from '@common/enums';
import { IAppConfig } from '@config';
import { MiddlewareCore } from '@core';

@Singleton()
export class PrometheusMiddleware extends MiddlewareCore {
  private readonly httpDurationMetricName: string;
  private readonly prefix: string;
  private readonly register: Registry;

  constructor(@Inject(ConfigKey.APP) private readonly appConfig: IAppConfig) {
    super();

    this.register = new Registry();
    this.prefix = `${this.appConfig.name.toLowerCase()}_`;
    this.httpDurationMetricName = this.prefix + 'http_request_duration_seconds';
  }

  handler(): RequestHandler {
    return promBundle({
      httpDurationMetricName: this.httpDurationMetricName,
      includeMethod: true,
      includePath: true,
      includeStatusCode: true,
      promClient: {
        collectDefaultMetrics: {
          prefix: this.prefix,
          register: this.register,
        },
      },
      promRegistry: this.register,
    });
  }
}
