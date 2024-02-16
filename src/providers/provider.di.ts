import { DiCore } from '@core/service';

import { AppleDi } from './apple/apple.di';
import { CacheManagerDi } from './cache-manager/cache-manager.di';
import { EmailDi } from './email/email.di';
import { FacebookDi } from './facebook/facebook.di';
import { GitHubDi } from './github/github.di';
import { GoogleDi } from './google/google.di';
import { LoggerDi } from './logger/logger.di';
import { TokenDi } from './token/token.di';

class ProviderDi extends DiCore {
  register() {
    new LoggerDi().register();
    new TokenDi().register();
    new CacheManagerDi().register();

    new AppleDi().register();
    new FacebookDi().register();
    new GitHubDi().register();
    new GoogleDi().register();

    new EmailDi().register();
  }
}

new ProviderDi().register();
