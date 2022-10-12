import { FullUser } from '@modules/user';
import { SocialNetwork } from '@utils';

export interface IPlatform {
  name: SocialNetwork;
  ssid: string;
  url?: string;
  user?: FullUser;
  userId: number;
}
