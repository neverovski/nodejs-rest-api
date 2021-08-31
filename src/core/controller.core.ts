import Logger from './logger';

export default class ControllerCore {
  init(): void {
    Logger.trace(`${this.constructor.name} initialized...`);
  }
}
