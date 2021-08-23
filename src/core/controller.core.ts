import { Logger } from '@utils/index';

export default class ControllerCore {
  init(): void {
    Logger.trace(`${this.constructor.name} initialized...`);
  }
}
