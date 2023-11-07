export class CommonUtil {
  static isEmpty(val?: any): boolean {
    return (
      // null or undefined
      (typeof val !== typeof (val ?? 1) ||
        // has length and it's zero
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        (val?.hasOwnProperty('length') && val?.length === 0) ||
        // is an Object and has no keys
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (val?.constructor === Object &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          Object.keys(val).length === 0)) as boolean
    );
  }

  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }
}
