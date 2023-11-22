import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { REG_PHONE } from '@common/constants';
import { AjvFormatKey } from '@common/enums';
import { UnprocessableEntityException } from '@common/exceptions';
import { ExceptionMessage, JsonSchema, JsonSchemaOptions } from '@common/types';
import { AjvUtil, StringUtil } from '@common/utils';
import { MiddlewareCore } from '@core';

class ValidateMiddleware extends MiddlewareCore {
  private ajv: Ajv;

  constructor() {
    super();
    this.ajv = new Ajv({ $data: true, allErrors: true, coerceTypes: true });

    addFormats(this.ajv);
    addErrors(this.ajv);
    addKeywords(this.ajv, ['transform', 'uniqueItemProperties']);

    this.registerFormat();
    this.registerKeyword();
  }

  handler(schemas: JsonSchemaOptions): RequestHandler {
    return async (
      req: Request<Record<string, unknown>, any, Record<string, unknown>>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        if (schemas.params) {
          await this.validate(schemas.params, req.params);
        }

        if (schemas.query) {
          await this.validate(schemas.query, req.query);
        }

        if (schemas.body) {
          await this.validate(schemas.body, req.body);
        }

        next();
      } catch (err: unknown) {
        res
          .status(422)
          .json(new UnprocessableEntityException(err as ExceptionMessage));
      }
    };
  }

  private registerFormat() {
    this.ajv.addFormat(AjvFormatKey.PHONE, REG_PHONE);
  }

  private registerKeyword() {
    this.ajv.addKeyword(AjvUtil.getSanitize());
  }

  private async validate(
    schema: JsonSchema,
    data: Record<string, unknown>,
  ): Promise<void> {
    const validate = this.ajv.compile(schema);

    return new Promise((resolve, reject) => {
      if (!validate(data) && validate.errors) {
        const errors: Array<{ key: string; value: string }> = [];
        const len = validate.errors.length;

        for (const err of validate.errors) {
          const name =
            (err.params.missingProperty as string) ||
            (err.params.additionalProperty as string) ||
            err.instancePath.slice(1);

          if (name || (len === 1 && err.keyword === 'errorMessage')) {
            errors.push({
              key: name || 'data',
              value: StringUtil.capitalizeOnlyFirstChar(err.message || ''),
            });
          }
        }

        reject(errors);

        return;
      }

      resolve();
    });
  }
}

export default new ValidateMiddleware();
