import { PlatformNetwork } from '../platform.constant';

export interface IPlatform {
  name: PlatformNetwork;
  ssid: string;
  url?: string;
  userId: number;
}
