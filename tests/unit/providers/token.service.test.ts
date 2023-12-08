import { createSigner } from 'fast-jwt';

import { DateUtil } from '@common/utils/date.util';
import { TokenService } from '@providers/token/token.service';

describe('TokenService', () => {
  const secret = 'SECRET';
  const expiresIn = DateUtil.parseStringToMs('1d');
  let tokenService: TokenService;

  beforeAll(() => {
    tokenService = new TokenService();
  });

  describe('signJwt', () => {
    it('signs a valid JWT', async () => {
      const jwt = await tokenService.signJwt({ ok: true }, secret, {
        expiresIn,
      });

      expect(jwt).toMatch(
        /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/,
      );
    });
  });

  describe('verify', () => {
    it('verifies a JWT', async () => {
      const jwtToken = await tokenService.signJwt({ ok: true }, secret, {
        expiresIn,
      });
      const verified = await tokenService.verifyJwt(jwtToken, secret);

      expect(verified).not.toBeUndefined();
    });

    it('verifies a JWT and gets data', async () => {
      const jwtToken = await tokenService.signJwt({ ok: true }, secret, {
        expiresIn,
      });
      const verified = await tokenService.verifyJwt<{ ok: boolean }>(
        jwtToken,
        secret,
      );

      expect(verified.ok).toEqual(true);
    });
  });

  describe('decode', () => {
    it('decodes a JWT', async () => {
      const jwtToken = await tokenService.signJwt({ ok: true }, secret, {
        expiresIn,
      });
      const verified = tokenService.decodeJwt(jwtToken);

      expect(verified).not.toBeUndefined();
    });

    it('decodes a JWT and gets data', async () => {
      const jwtToken = await tokenService.signJwt({ ok: true }, secret, {
        expiresIn,
      });
      const verified = tokenService.decodeJwt<{ ok: boolean }>(jwtToken);

      expect(verified.ok).toEqual(true);
    });

    it('decodes a JWT and with a wrong secret', async () => {
      // eslint-disable-next-line @typescript-eslint/require-await
      const sign = createSigner({ expiresIn, key: async () => secret });
      const jwtToken = await sign({ ok: true });

      const verified = tokenService.decodeJwt<{ ok: boolean }>(jwtToken);

      expect(verified.ok).toEqual(true);
    });
  });
});
