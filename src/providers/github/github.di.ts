import { container } from 'tsyringe';

import GitHubService from './github.service';
import { GitHubInject } from './github.type';
import { IGitHubService } from './interface';

container.registerInstance<IGitHubService>(
  GitHubInject.GITHUB_SERVICE,
  new GitHubService(),
);
