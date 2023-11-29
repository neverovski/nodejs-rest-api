import path from 'path';

import { config } from 'dotenv';

import { ENV_TEST } from '@common/constants';
import { JoiCtx } from '@common/types';
import { JoiUtil } from '@common/utils';

config({
  path: path.join(
    process.cwd(),
    `.env${process?.env?.APP_ENV === ENV_TEST ? `.${ENV_TEST}` : ''}`,
  ),
});

export abstract class ConfigCore {
  get schema() {
    return JoiUtil.schema;
  }

  set<T = string>(key: string, schema: JoiCtx['schema']): T {
    return JoiUtil.validate<T>(key, {
      schema,
      value: process?.env?.[key],
    });
  }

  protected abstract init(): void;
}
