import joi from 'joi';

import { JoiUtil } from '@common/utils/joi.util';

describe('JoiUtil', () => {
  describe('validate', () => {
    it('should return the value when it is valid', () => {
      const key = 'testKey';
      const value = 'testValue';
      const schema = joi.string().required();
      const ctx = { schema, value };

      const result = JoiUtil.validate<string>(key, ctx);

      expect(result).toEqual(value);
    });

    it('should throw an error when the value is invalid', () => {
      const key = 'testKey';
      const value = 123;
      const schema = joi.string().required();
      const ctx = { schema, value };

      expect(() => JoiUtil.validate<string>(key, ctx)).toThrow();
    });

    it('should return the value when it is valid and the schema is complex', () => {
      const key = 'testKey';
      const value = { prop1: 'testValue', prop2: 123 };
      const schema = joi.object({
        prop1: joi.string().required(),
        prop2: joi.number().required(),
      });
      const ctx = { schema, value };

      const result = JoiUtil.validate<typeof value>(key, ctx);

      expect(result).toEqual(value);
    });

    it('should throw an error when the value is invalid and the schema is complex', () => {
      const key = 'testKey';
      const value = { prop1: 'testValue', prop2: 'invalid' };
      const schema = joi.object({
        prop1: joi.string().required(),
        prop2: joi.number().required(),
      });
      const ctx = { schema, value };

      expect(() => JoiUtil.validate<typeof value>(key, ctx)).toThrow();
    });
  });
});
