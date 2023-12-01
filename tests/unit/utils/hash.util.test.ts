import crypto from 'crypto';

import { HashUtil } from '@common/utils/hash.util';

describe('HashUtil', () => {
  describe('generateHashFromString', () => {
    it('should return a hash when a string is provided', () => {
      const input = 'testString';
      const expected = crypto.createHash('md5').update(input).digest('hex');

      const result = HashUtil.generateHashFromString(input);

      expect(result).toEqual(expected);
    });

    it('should return a different hash when a different string is provided', () => {
      const input1 = 'testString1';
      const input2 = 'testString2';
      const expected1 = crypto.createHash('md5').update(input1).digest('hex');
      const expected2 = crypto.createHash('md5').update(input2).digest('hex');

      const result1 = HashUtil.generateHashFromString(input1);
      const result2 = HashUtil.generateHashFromString(input2);

      expect(result1).toEqual(expected1);
      expect(result2).toEqual(expected2);
      expect(result1).not.toEqual(result2);
    });

    it('should return the same hash when the same string is provided', () => {
      const input = 'testString';
      const expected = crypto.createHash('md5').update(input).digest('hex');

      const result1 = HashUtil.generateHashFromString(input);
      const result2 = HashUtil.generateHashFromString(input);

      expect(result1).toEqual(expected);
      expect(result2).toEqual(expected);
      expect(result1).toEqual(result2);
    });
  });

  describe('generateRandomNumber', () => {
    it('should return a number with the specified length', () => {
      const len = 5;
      const result = HashUtil.generateRandomNumber(len);

      expect(result.toString().length).toEqual(len);
    });

    it('should return a different number on each call', () => {
      const len = 5;
      const result1 = HashUtil.generateRandomNumber(len);
      const result2 = HashUtil.generateRandomNumber(len);

      expect(result1).not.toEqual(result2);
    });

    it('should return a number within the range of the specified length', () => {
      const len = 5;
      const min = Math.pow(10, len - 1);
      const max = Math.pow(10, len) - 1;
      const result = HashUtil.generateRandomNumber(len);

      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  });

  describe('generateUuid', () => {
    it('should return a string', () => {
      const result = HashUtil.generateUuid();

      expect(typeof result).toEqual('string');
    });

    it('should return a different UUID on each call', () => {
      const result1 = HashUtil.generateUuid();
      const result2 = HashUtil.generateUuid();

      expect(result1).not.toEqual(result2);
    });

    it('should return a valid UUID', () => {
      const uuidRegex =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
      const result = HashUtil.generateUuid();

      expect(result).toMatch(uuidRegex);
    });
  });

  describe('hashPassword', () => {
    it('should return null when no password is provided', async () => {
      const result = await HashUtil.hashPassword();

      expect(result).toBeNull();
    });

    it('should return a string when a password is provided', async () => {
      const password = 'testPassword';
      const result = await HashUtil.hashPassword(password);

      expect(typeof result).toEqual('string');
    });

    it('should return a different hash when a different password is provided', async () => {
      const password1 = 'testPassword1';
      const password2 = 'testPassword2';
      const result1 = await HashUtil.hashPassword(password1);
      const result2 = await HashUtil.hashPassword(password2);

      expect(result1).not.toEqual(result2);
    });
  });

  describe('isComparePassword', () => {
    it('should return false when no password or oldPassword is provided', async () => {
      const result = await HashUtil.isComparePassword();

      expect(result).toEqual(false);
    });

    it('should return false when the oldPassword does not contain a salt or hashKey', async () => {
      const password = 'testPassword';
      const oldPassword = 'invalidOldPassword';
      const result = await HashUtil.isComparePassword(password, oldPassword);

      expect(result).toEqual(false);
    });

    it('should return true when the password and oldPassword match', async () => {
      const password = 'testPassword';
      const oldPassword = await HashUtil.hashPassword(password);

      const result = await HashUtil.isComparePassword(password, oldPassword);

      expect(result).toEqual(true);
    });
  });
});
