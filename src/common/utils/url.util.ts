import { CommonUtil } from './common.util';

export class UrlUtil {
  static createUrl(
    urlInput: string,
    searchParams?: Record<string, unknown>,
  ): string {
    try {
      const url = new URL(urlInput);

      if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
          if (!CommonUtil.isNullOrUndefined(value)) {
            url.searchParams.append(key, String(value));
          }
        }
      }

      return url.toString();
    } catch {
      return urlInput;
    }
  }

  static getDomain(url?: string): string {
    const defaultDomain = 'localhost';

    try {
      return new URL(url || 'localhost')?.hostname || defaultDomain;
    } catch (err) {
      return defaultDomain;
    }
  }
}
