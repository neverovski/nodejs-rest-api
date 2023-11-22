import { AuthDi } from './auth/auth.di';
import { NotificationDi } from './notification/notification.di';
import { PlatformDi } from './platform/platform.di';
import { RefreshTokenDi } from './refresh-token/refresh-token.di';
import { UserDi } from './user/user.di';

NotificationDi.init();

UserDi.init();
RefreshTokenDi.init();
PlatformDi.init();

AuthDi.init();
