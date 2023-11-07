import { AppleDependencies } from './apple/apple.di';
import { CacheManagerDependencies } from './cache-manager/cache-manager.di';
import { EmailDependencies } from './email/email.di';
import { FacebookDependencies } from './facebook/facebook.di';
import { GitHubDependencies } from './github/github.di';
import { GoogleDependencies } from './google/google.di';
import { LoggerDependencies } from './logger/logger.di';
import { TokenDependencies } from './token/token.di';

LoggerDependencies.init();
TokenDependencies.init();
CacheManagerDependencies.init();

AppleDependencies.init();
FacebookDependencies.init();
GitHubDependencies.init();
GoogleDependencies.init();

EmailDependencies.init();
