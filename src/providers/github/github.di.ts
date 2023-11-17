import { container } from 'tsyringe';

import { GitHubInject } from './github.enum';
import { GitHubService } from './github.service';
import { IGitHubService } from './interface';

export class GitHubDi {
  static init() {
    this.registerService();
  }

  private static registerService() {
    container.registerInstance<IGitHubService>(
      GitHubInject.SERVICE,
      new GitHubService(),
    );
  }
}
