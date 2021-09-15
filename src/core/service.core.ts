import Logger from './logger';

export default class ServiceCore {
  init(): void {
    Logger.trace(`${this.constructor.name} initialized...`);
  }
}
