import { PlatformNetwork } from '../platform.type';

export interface IPlatform {
  name: PlatformNetwork;
  ssid: string;
  url?: string;
  userId: number;
}
