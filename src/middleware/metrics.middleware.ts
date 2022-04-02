/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RequestHandler } from 'express';
import promBundle from 'express-prom-bundle';
import { Registry } from 'prom-client';

import { AppConfig } from '@config';
import { MiddlewareCore } from '@core';

class MetricsMiddleware extends MiddlewareCore {
  private readonly httpDurationMetricName: string;
  private readonly prefix: string;
  private readonly register: Registry;

  constructor() {
    super();

    this.register = new Registry();
    this.prefix = `${AppConfig.name.toLowerCase()}_`;
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
          timeout: 5000,
          register: this.register,
        },
      },
      promRegistry: this.register,
    });
  }
}

export default new MetricsMiddleware();
