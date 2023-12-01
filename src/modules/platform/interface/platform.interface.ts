import { PlatformName } from '@common/enums';
import type { FullUser } from '@modules/user';

export interface IPlatform {
  name: PlatformName;
  ssid: string;
  url?: string | null;
  user?: FullUser;
  userId: number;
}
