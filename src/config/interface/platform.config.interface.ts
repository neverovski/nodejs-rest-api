import {
  AppleConfigType,
  FacebookConfigType,
  GitHubConfigType,
  GoogleConfigType,
} from '@common/types';

export interface IPlatformConfig {
  apple: AppleConfigType;
  facebook: FacebookConfigType;
  github: GitHubConfigType;
  google: GoogleConfigType;
}
