import { UAParser } from 'ua-parser-js';

const parser = new UAParser();

export const getOS = (ua: string): string =>
  parser?.setUA(ua)?.getOS()?.name || '';

export const getBrowser = (ua: string): string =>
  parser?.setUA(ua)?.getBrowser()?.name || '';
