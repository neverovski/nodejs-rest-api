import { UAParser } from 'ua-parser-js';

export class UserAgetUtil {
  private static readonly parser = new UAParser();

  static getBrowser(ua: string): string {
    return UserAgetUtil.parser?.setUA(ua)?.getBrowser()?.name || '';
  }

  static getOS(ua: string): string {
    return UserAgetUtil.parser?.setUA(ua)?.getOS()?.name || '';
  }
}
