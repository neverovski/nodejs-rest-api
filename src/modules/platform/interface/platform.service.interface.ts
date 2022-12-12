import { PlatformRequest } from '../platform.type';

export interface IPlatformService {
  create(body: PlatformRequest): Promise<{ userId: number }>;
}
