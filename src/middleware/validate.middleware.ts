import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { JSONSchema7 } from 'json-schema';

import { MiddlewareCore } from '@core';
import { IJsonSchema } from '@core/schema';
import { CodeResponse } from '@utils';
import { SanitizerHelper, StringHelper } from '@utils/helpers';

class ValidateMiddleware extends MiddlewareCore {
  protected ajv: Ajv;

  constructor() {
    super();

    this.ajv = new Ajv({ allErrors: true, coerceTypes: true });
    addFormats(this.ajv);
    addKeywords(this.ajv, ['transform', 'uniqueItemProperties']);
    this.ajv.addFormat('phone', /^\+[0-9]*/);

    this.ajv.addKeyword({
      keyword: 'sanitize',
      modifying: true,
      compile(schema) {
        return (data, dataCxt) => {
          if (
            !dataCxt?.parentDataProperty &&
            dataCxt?.parentDataProperty !== 0
          ) {
            throw new TypeError('Data must be a property of an object');
          }

          if (
            typeof schema === 'string' &&
            schema === 'escape' &&
            dataCxt?.parentData &&
            dataCxt?.parentDataProperty
          ) {
            dataCxt.parentData[dataCxt.parentDataProperty] =
              SanitizerHelper.escape(data as string);
          }

          return true;
        };
      },
      errors: false,
    });
  }

  handler(schemas: IJsonSchema): RequestHandler {
    return async (
      req: Request<Record<string, unknown>, any, Record<string, unknown>>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        await this.validate(schemas.params, req.params);
        await this.validate(schemas.query, req.query);
        await this.validate(schemas.body, req.body);
        next();
      } catch (errors) {
        res.status(422).json({
          ...CodeResponse.UNPROCESSABLE_ENTITY,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors,
        });
      }
    };
  }

  private async validate(
    schema: JSONSchema7,
    data: Record<string, unknown>,
  ): Promise<void> {
    const validate = this.ajv.compile(schema);

    return new Promise((resolve, reject) => {
      if (!validate(data) && validate.errors) {
        const errors: { [key: string]: string } = {};

        for (const err of validate.errors) {
          const name = err.instancePath.slice(1);

          if (name) {
            errors[name] = StringHelper.capitalize(err.message || '');
          }
        }

        reject(errors);
      } else {
        resolve();
      }
    });
  }
}

export default new ValidateMiddleware();
