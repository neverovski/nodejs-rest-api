export class StringUtil {
  static capitalizeOnlyFirstChar(s?: string): string {
    if (typeof s !== 'string') {
      return '';
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static convertJsonToString<T>(data: T): string {
    try {
      return JSON.stringify(data);
    } catch {
      return '';
    }
  }

  static convertStringToJson<T>(data: string): T {
    return JSON.parse(data) as T;
  }

  static convertStringToNumber(val?: any): number {
    return StringUtil.isNumber(val) ? Number(val) : 0;
  }

  static decodeBase64ToString(str: string): string {
    if (str) {
      return Buffer.from(str, 'base64').toString('ascii');
    }

    return '';
  }

  static escape(str: string) {
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#47;')
      .replace(/\\/g, '&#92;');
  }

  static isNumber(val?: any) {
    const num = val !== '' ? Number(val ?? undefined) : undefined;

    return num === 0 || !!num;
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
