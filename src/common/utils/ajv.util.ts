import type { DataValidationCxt, KeywordDefinition } from 'ajv/dist/types';

import { AjvKeywordKey, AjvSanitizeKey } from '@common/enums';

import { StringUtil } from './string.util';

export class AjvUtil {
  static getSanitize(): KeywordDefinition {
    return {
      keyword: AjvKeywordKey.SANITIZE,
      type: 'string',
      modifying: true,
      compile: void this.compileSanitize,
      errors: false,
    };
  }

  private static compileSanitize(schema: any) {
    return (data: string, dataCxt?: DataValidationCxt) => {
      if (!dataCxt?.parentDataProperty && dataCxt?.parentDataProperty !== 0) {
        throw new TypeError('Data must be a property of an object');
      }

      if (dataCxt?.parentData && dataCxt?.parentDataProperty) {
        switch (schema) {
          case AjvSanitizeKey.ESCAPE:
            dataCxt.parentData[dataCxt.parentDataProperty] =
              StringUtil.escape(data);
            break;
        }
      }

      return true;
    };
  }
}
