export class StringUtil {
  static capitalizeOnlyFirstChar(s?: string): string {
    if (typeof s !== 'string') {
      return '';
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static convertJsonToString<T>(data?: T): string {
    try {
      return JSON.stringify(data) ?? '';
    } catch {
      return '';
    }
  }

  static convertStringToJson<T>(data?: string): T {
    if (!data) {
      return {} as T;
    }

    try {
      return (JSON.parse(data) ?? {}) as T;
    } catch {
      return {} as T;
    }
  }

  static decodeBase64ToString(str?: string | null): string {
    if (typeof str !== 'string' || !str) {
      return '';
    }

    if (Buffer.from(str, 'base64').toString('base64') !== str) {
      return '';
    }

    return Buffer.from(str, 'base64').toString('ascii');
  }

  static escape(str?: string | null) {
    if (typeof str !== 'string' || !str) {
      return '';
    }

    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#47;')
      .replace(/\\/g, '&#92;');
  }

  static replace(
    str: string,
    keys: { [key: string]: string | number },
    delimiter = ['{', '}'],
  ): string {
    Object.keys(keys).forEach((key) => {
      if (delimiter && delimiter[0] && delimiter[1]) {
        str = str.replaceAll(
          `${delimiter[0]}${key}${delimiter[1]}`,
          `${keys[key] ?? ''}`,
        );
      }
    });

    return str;
  }
}
