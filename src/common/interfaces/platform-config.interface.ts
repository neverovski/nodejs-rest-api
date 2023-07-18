import {
  AppleConfigType,
  FacebookConfigType,
  GoogleConfigType,
} from '@common/types';

export interface IPlatformConfig {
  apple: AppleConfigType;
  facebook: FacebookConfigType;
  google: GoogleConfigType;
}
