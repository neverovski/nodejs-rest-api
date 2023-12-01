export class NumberUtil {
  static convertStringToNumber(val?: any): number {
    return NumberUtil.isNumber(val) ? Number(val) : 0;
  }

  static isNumber(val?: any) {
    const num = val !== '' ? Number(val ?? undefined) : undefined;

    return num === 0 || !!num;
  }
}
