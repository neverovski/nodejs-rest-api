import {
  ENV_CLI,
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
  ENV_SEED,
  ENV_TEST,
} from '@common/constants';
import { Cors } from '@common/types';

export interface IAppConfig {
  cors: Cors;
  domain: string;
  env:
    | typeof ENV_CLI
    | typeof ENV_DEVELOPMENT
    | typeof ENV_PRODUCTION
    | typeof ENV_SEED
    | typeof ENV_TEST;
  host: string;
  name: string;
  port: number;
}
