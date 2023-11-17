import { PlatformName } from '@common/enums';

export type PlatformPayload = {
  avatar?: {
    filePath?: string;
    name?: string;
    thumbnailPath?: string;
  };
  email?: Email;
  name: PlatformName;
  profile?: {
    firstName?: string;
    lastName?: string;
  };
  ssid: string;
  url?: string;
};
