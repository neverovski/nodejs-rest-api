import path from 'path';

import { ConfigCore } from '@core/index';
import {
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
  ENV_TEST,
  FOLDER_SCRIPT,
} from '@utils/constants';

class AppConfig extends ConfigCore {
  readonly env: string;
  readonly name: string;
  readonly port: number;
  readonly host: string;
  readonly deployToken: string;
  readonly pathFileDeploy: string;

  constructor() {
    super();

    this.env = this.set<string>(
      'NODE_ENV',
      this.joi.string().valid(ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST),
      ENV_DEVELOPMENT,
    );
    this.name = this.set<string>('APP_NAME', this.joi.string().required(), '');
    this.port = this.set<number>(
      'APP_PORT',
      this.joi.number().port().required(),
      5656,
    );
    this.host = this.set<string>(
      'APP_HOST',
      this.joi.string().required(),
      'http://localhost',
    );
    this.deployToken = this.set<string>(
      'SECRET_DEPLOY_TOKEN',
      this.joi.string().required(),
      'localhost',
    );
    this.pathFileDeploy = this.fileDeploy;
  }

  private get fileDeploy(): string {
    const fileName = this.set<string>(
      'FILE_SCRIPT_DEPLOY',
      this.joi.string().required(),
      'deploy.sh',
    );

    return path.join(process.cwd(), FOLDER_SCRIPT, fileName);
  }
}

export default new AppConfig();
