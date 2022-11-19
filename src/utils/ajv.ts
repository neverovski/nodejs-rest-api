/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const escape = (str: string) =>
  str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#47;')
    .replace(/\\/g, '&#92;');

export const sanitize = (schema) => {
  return (data, dataCxt) => {
    if (!dataCxt?.parentDataProperty && dataCxt?.parentDataProperty !== 0) {
      throw new TypeError('Data must be a property of an object');
    }

    if (
      typeof schema === 'string' &&
      schema === 'escape' &&
      dataCxt?.parentData &&
      dataCxt?.parentDataProperty
    ) {
      dataCxt.parentData[dataCxt.parentDataProperty] = escape(data as string);
    }

    return true;
  };
};

export const phoneFormat = /^\+[0-9]*/;
