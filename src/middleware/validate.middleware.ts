import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { JSONSchema7 } from 'json-schema';

import { MiddlewareCore } from '@core';
import { IJsonSchema } from '@core/schema';
import { HttpException } from '@utils';
import { AjvHelper, ExceptionHelper, StringHelper } from '@utils/helpers';

class ValidateMiddleware extends MiddlewareCore {
  protected ajv: Ajv;

  constructor() {
    super();

    this.ajv = new Ajv({ allErrors: true, coerceTypes: true });
    addErrors(this.ajv);
    addFormats(this.ajv);
    addKeywords(this.ajv, ['transform', 'uniqueItemProperties']);

    this.ajv.addFormat('phone', AjvHelper.phoneFormat);

    this.ajv.addKeyword({
      keyword: 'sanitize',
      modifying: true,
      compile: AjvHelper.sanitize,
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
        res.status(422).json(
          ExceptionHelper.getOk(HttpException.UNPROCESSABLE_ENTITY, {
            errors: errors as { [key: string]: string },
          }),
        );
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
        const len = validate.errors.length;

        for (const err of validate.errors) {
          const name =
            (err.params.missingProperty as string) ||
            (err.params.additionalProperty as string) ||
            err.instancePath.slice(1);

          if (name || (len === 1 && err.keyword === 'errorMessage')) {
            errors[name || 'data'] = StringHelper.capitalize(err.message || '');
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
