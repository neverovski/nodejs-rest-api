import crypto from 'node:crypto';

import {
  HASH_ENCODING,
  HASH_KEY_LENGTH,
  SALT_KEY_LENGTH,
  SALT_SPLIT_SYMBOL,
} from '@common/constants';

export class HashUtil {
  static generateHashFromString(str: string): string {
    return crypto.createHash('md5').update(str).digest('hex');
  }

  static generateRandomNumber(len: number): number {
    const min = Math.pow(10, len - 1);
    const max = Math.pow(10, len) - 1;

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static generateUuid() {
    return crypto.randomUUID();
  }

  static hashPassword(password?: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!password) {
        return resolve(null);
      }

      const salt = crypto.randomBytes(SALT_KEY_LENGTH).toString('hex');

      crypto.scrypt(password, salt, HASH_KEY_LENGTH, (err, derivedKey) => {
        if (err) reject(err);

        return resolve(
          `${salt}${SALT_SPLIT_SYMBOL}${derivedKey.toString(HASH_ENCODING)}`,
        );
      });
    });
  }

  static isComparePassword(
    password?: string | null,
    oldPassword?: string | null,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      if (!oldPassword || !password) {
        return resolve(false);
      }

      const [salt, hashKey] = oldPassword.split(SALT_SPLIT_SYMBOL);

      if (!salt || !hashKey) {
        return resolve(false);
      }

      const hashKeyBuff = Buffer.from(hashKey, HASH_ENCODING);

      crypto.scrypt(password, salt, HASH_KEY_LENGTH, (err, derivedKey) => {
        if (err || hashKeyBuff.length !== derivedKey.length) {
          return resolve(false);
        }

        // Accepts Buffer only and thereby preventing timing attack
        return resolve(crypto.timingSafeEqual(hashKeyBuff, derivedKey));
      });
    });
  }
}
