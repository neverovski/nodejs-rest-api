import { container as Container } from 'tsyringe';

import { DiCore } from '@core/service';

import { GitHubInject } from './github.enum';
import { GitHubService } from './github.service';
import { IGitHubService } from './interface';

export class GitHubDi extends DiCore {
  register() {
    this.registerService();
  }

  private registerService() {
    Container.registerSingleton<IGitHubService>(
      GitHubInject.SERVICE,
      GitHubService,
    );
  }
}
