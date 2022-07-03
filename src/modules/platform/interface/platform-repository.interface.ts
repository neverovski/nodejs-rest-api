import { PlatformProvider } from '../platform.type';

export interface IPlatformRepository {
  create(body: PlatformProvider): Promise<Id & Pick<PlatformProvider, 'email'>>;
}
