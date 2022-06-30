export const escape = (str: string) =>
  str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#47;')
    .replace(/\\/g, '&#92;');
