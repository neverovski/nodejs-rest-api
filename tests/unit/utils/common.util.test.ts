import { CommonUtil } from '@common/utils/common.util';

describe('CommonUtil', () => {
  describe('isEmpty', () => {
    it('should return true for null or undefined', () => {
      expect(CommonUtil.isEmpty(null)).toEqual(true);
      expect(CommonUtil.isEmpty(undefined)).toEqual(true);
    });

    it('should return true for an empty string', () => {
      expect(CommonUtil.isEmpty('')).toEqual(true);
    });

    it('should return true for an empty array', () => {
      expect(CommonUtil.isEmpty([])).toEqual(true);
    });

    it('should return true for an empty object', () => {
      expect(CommonUtil.isEmpty({})).toEqual(true);
    });

    it('should return false for a non-empty string', () => {
      expect(CommonUtil.isEmpty('not empty')).toEqual(false);
    });

    it('should return false for a non-empty array', () => {
      expect(CommonUtil.isEmpty([1, 2, 3])).toEqual(false);
    });

    it('should return false for a non-empty object', () => {
      expect(CommonUtil.isEmpty({ key: 'value' })).toEqual(false);
    });

    it('should return false for a number', () => {
      expect(CommonUtil.isEmpty(10)).toEqual(false);
    });

    it('should return false for a boolean', () => {
      expect(CommonUtil.isEmpty(true)).toEqual(false);
      expect(CommonUtil.isEmpty(false)).toEqual(false);
    });
  });

  describe('isNullOrUndefined', () => {
    it('should return true for null', () => {
      expect(CommonUtil.isNullOrUndefined(null)).toEqual(true);
    });

    it('should return true for undefined', () => {
      expect(CommonUtil.isNullOrUndefined(undefined)).toEqual(true);
    });

    it('should return false for an empty string', () => {
      expect(CommonUtil.isNullOrUndefined('')).toEqual(false);
    });

    it('should return false for a number', () => {
      expect(CommonUtil.isNullOrUndefined(0)).toEqual(false);
      expect(CommonUtil.isNullOrUndefined(123)).toEqual(false);
    });

    it('should return false for a boolean', () => {
      expect(CommonUtil.isNullOrUndefined(true)).toEqual(false);
      expect(CommonUtil.isNullOrUndefined(false)).toEqual(false);
    });

    it('should return false for an empty array', () => {
      expect(CommonUtil.isNullOrUndefined([])).toEqual(false);
    });

    it('should return false for an empty object', () => {
      expect(CommonUtil.isNullOrUndefined({})).toEqual(false);
    });
  });
});
