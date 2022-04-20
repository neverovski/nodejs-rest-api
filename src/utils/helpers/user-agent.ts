import { UAParser } from 'ua-parser-js';

export default (() => {
  const parser = new UAParser();

  const getOS = (ua: string): string => parser?.setUA(ua)?.getOS()?.name || '';

  const getBrowser = (ua: string): string =>
    parser?.setUA(ua)?.getBrowser()?.name || '';

  return { getOS, getBrowser };
})();
