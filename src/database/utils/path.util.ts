import { resolve } from 'path';

import { ENV_SEED } from '@common/constants';

export class PathUtil {
  static getMigrations(env: string) {
    switch (env) {
      case ENV_SEED:
        return [resolve('src/database/seed/*{.ts,.js}')];
      default:
        return [resolve('src/database/migration/*{.ts,.js}')];
    }
  }

  static getMigrationsTableName(env: string) {
    switch (env) {
      case ENV_SEED:
        return 'seeds';
      default:
        return 'migrations';
    }
  }
}
