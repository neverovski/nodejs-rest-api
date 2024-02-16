import { DiCore } from '@core/service';

import { AuthDi } from './auth/auth.di';
import { NotificationDi } from './notification/notification.di';
import { OtpDi } from './otp/otp.di';
import { PlatformDi } from './platform/platform.di';
import { RefreshTokenDi } from './refresh-token/refresh-token.di';
import { UserDi } from './user/user.di';

class ModuleDi extends DiCore {
  register() {
    new NotificationDi().register();
    new OtpDi().register();

    new UserDi().register();
    new RefreshTokenDi().register();
    new PlatformDi().register();

    new AuthDi().register();
  }
}

new ModuleDi().register();
