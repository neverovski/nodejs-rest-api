import { AppleDi } from './apple/apple.di';
import { CacheManagerDi } from './cache-manager/cache-manager.di';
import { EmailDi } from './email/email.di';
import { FacebookDi } from './facebook/facebook.di';
import { GitHubDi } from './github/github.di';
import { GoogleDi } from './google/google.di';
import { LoggerDi } from './logger/logger.di';
import { TokenDi } from './token/token.di';

LoggerDi.init();
TokenDi.init();
CacheManagerDi.init();

AppleDi.init();
FacebookDi.init();
GitHubDi.init();
GoogleDi.init();

EmailDi.init();
