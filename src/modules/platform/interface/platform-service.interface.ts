import { PlatformRequest, PlatformProvider } from '../platform.type';

export interface IPlatformService {
  create(body: PlatformRequest): Promise<Id & Pick<PlatformProvider, 'email'>>;
}
