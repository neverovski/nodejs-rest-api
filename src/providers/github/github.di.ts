import { container } from 'tsyringe';

import GitHubService from './github.service';
import { GitHubInject } from './github.type';
import { IGitHubService } from './interface';

container.registerSingleton<IGitHubService>(
  GitHubInject.GITHUB_SERVICE,
  GitHubService,
);
