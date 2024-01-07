import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
  RequestHandler,
} from 'express';
import { singleton as Singleton } from 'tsyringe';

import { REG_PHONE } from '@common/constants';
import { AjvFormatKey, HttpStatus } from '@common/enums';
import { UnprocessableEntityException } from '@common/exceptions';
import { ExceptionMessage, JsonSchema, JsonSchemaOptions } from '@common/types';
import { AjvUtil, StringUtil } from '@common/utils';
import { MiddlewareCore } from '@core';

@Singleton()
export class ValidateMiddleware extends MiddlewareCore {
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
      req: ExpressRequest<
        Record<string, unknown>,
        unknown,
        Record<string, unknown>
      >,
      res: ExpressResponse,
      next: NextFunction,
    ) => {
      try {
        await this.validateRequest(schemas, req);

        next();
      } catch (err: unknown) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          data: new UnprocessableEntityException(err as ExceptionMessage),
        });
      }
    };
  }

  protected async validateRequest(
    schemas: JsonSchemaOptions,
    req: ExpressRequest<
      Record<string, unknown>,
      unknown,
      Record<string, unknown>
    >,
  ) {
    if (schemas.params) {
      await this.validate(schemas.params, req.params);
    }

    if (schemas.query) {
      await this.validate(schemas.query, req.query);
    }

    if (schemas.body) {
      await this.validate(schemas.body, req.body);
    }
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            (err.params.errors?.at(0)?.params?.missingProperty as string) ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            (err.params.errors?.at(0)?.params?.additionalProperty as string) ||
            '';

          const fullName = `${err.instancePath}${name && `/${name}`}`.slice(1);

          if (fullName || (len === 1 && err.keyword === 'errorMessage')) {
            errors.push({
              key: fullName || 'data',
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
