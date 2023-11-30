import { NumberUtil } from '@common/utils/number.util';

describe('NumberUtil', () => {
  describe('convertStringToNumber', () => {
    it('should return a number when a valid number string is provided', () => {
      const input = '123';
      const result = NumberUtil.convertStringToNumber(input);

      expect(result).toEqual(123);
    });

    it('should return a number when a valid number is provided', () => {
      const input = 123;
      const result = NumberUtil.convertStringToNumber(input);

      expect(result).toEqual(123);
    });

    it('should return 0 when an invalid number string is provided', () => {
      const input = 'invalid number string';
      const result = NumberUtil.convertStringToNumber(input);

      expect(result).toEqual(0);
    });

    it('should return 0 when a non-number type is provided', () => {
      const input = { key: 'value' };
      const result = NumberUtil.convertStringToNumber(input);

      expect(result).toEqual(0);
    });

    it('should return 0 when the input is null', () => {
      const input = null;
      const result = NumberUtil.convertStringToNumber(input);

      expect(result).toEqual(0);
    });

    it('should return 0 when the input is undefined', () => {
      const result = NumberUtil.convertStringToNumber();

      expect(result).toEqual(0);
    });
  });

  describe('isNumber', () => {
    it('should return true when a number is provided', () => {
      const input = 123;
      const result = NumberUtil.isNumber(input);

      expect(result).toBe(true);
    });

    it('should return true when a number string is provided', () => {
      const input = '123';
      const result = NumberUtil.isNumber(input);

      expect(result).toBe(true);
    });

    it('should return false when a non-number string is provided', () => {
      const input = 'invalid number string';
      const result = NumberUtil.isNumber(input);

      expect(result).toBe(false);
    });

    it('should return false when an empty string is provided', () => {
      const input = '';
      const result = NumberUtil.isNumber(input);

      expect(result).toBe(false);
    });

    it('should return false when a non-number type is provided', () => {
      const input = { key: 'value' };
      const result = NumberUtil.isNumber(input);

      expect(result).toBe(false);
    });

    it('should return false when null is provided', () => {
      const input = null;
      const result = NumberUtil.isNumber(input);

      expect(result).toBe(false);
    });

    it('should return false when undefined is provided', () => {
      const result = NumberUtil.isNumber();

      expect(result).toBe(false);
    });

    it('should return true when 0 is provided', () => {
      const input = 0;
      const result = NumberUtil.isNumber(input);

      expect(result).toBe(true);
    });
  });
});
