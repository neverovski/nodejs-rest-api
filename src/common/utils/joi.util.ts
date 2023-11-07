import joi from 'joi';

import { JoiCtx } from '@common/types';

export class JoiUtil {
  static get schema() {
    return joi;
  }

  static validate<T>(key: string, ctx: JoiCtx): T {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error, value } = ctx.schema.validate(ctx.value);

    if (error) {
      throw new Error(JoiUtil.transformError(key, error));
    }

    return value as T;
  }

  private static transformError(key: string, error?: joi.ValidationError) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = error?.details?.[0]?.context?.value || '';
    const message = error?.message || '';

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `Wrong "${key}" variable; Value: "${value}" is invalid. ${message}`;
  }
}
