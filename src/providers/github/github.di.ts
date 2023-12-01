import { container as Container } from 'tsyringe';

import { GitHubInject } from './github.enum';
import { GitHubService } from './github.service';
import { IGitHubService } from './interface';

export class GitHubDi {
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
