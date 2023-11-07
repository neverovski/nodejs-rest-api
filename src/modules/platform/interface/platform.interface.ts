import { SocialNetwork } from '@common/enums';
import type { FullUser } from '@modules/user';

export interface IPlatform {
  name: SocialNetwork;
  ssid: string;
  url?: string | null;
  user?: FullUser;
  userId: number;
}
