export class UrlUtil {
  static getDomain(url?: string): string {
    const defaultDomain = 'localhost';

    try {
      return new URL(url || 'localhost')?.hostname || defaultDomain;
    } catch (err) {
      return defaultDomain;
    }
  }
}
