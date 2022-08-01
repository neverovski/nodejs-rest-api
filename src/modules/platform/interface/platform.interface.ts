import { SocialNetwork } from '@utils';

export interface IPlatform {
  name: SocialNetwork;
  ssid: string;
  url?: string;
  userId: number;
}
