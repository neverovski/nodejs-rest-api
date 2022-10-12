import {
  FullPlatform,
  PlatformOption,
  PlatformProvider,
} from '../platform.type';

export interface IPlatformRepository {
  create(body: PlatformProvider): Promise<{ userId: number }>;
  findOne(options: PlatformOption): Promise<FullPlatform | null>;
}
