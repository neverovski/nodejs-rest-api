import path from 'path';

import { config } from 'dotenv';
import Join, { Root as JoinRoot, Schema } from 'joi';

import { ENV_TEST } from '@utils';

import { IConfig } from './interface';

config({
  path: path.join(
    process.cwd(),
    process?.env?.APP_ENV === ENV_TEST ? '.env.test' : '.env',
  ),
});

export default class ConfigInstance implements IConfig {
  get joi(): JoinRoot {
    return Join;
  }

  set<T>(env: string, validator: Schema, defaultVal?: T | null): T {
    let item: any;

    if (process.env[env] || process.env[env] === '') {
      item = process.env[env];
    } else {
      item = defaultVal ?? null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error, value } = validator.validate(item);

    if (!error) return value as T;
    throw new Error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Wrong "${env}" variable; Value: "${value}" is invalid. ${error}`,
    );
  }
}
