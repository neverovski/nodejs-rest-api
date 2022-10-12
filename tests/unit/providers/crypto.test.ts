import { expect } from 'chai';

import { JwtConfig } from '@config';
import CryptoService from '@providers/crypto/crypto.service';

type JWT = {
  email: string;
  exp: number;
  iat: number;
  jwtId: string;
  userId: number;
};

const cryptoService = new CryptoService();
const jwtId = cryptoService.generateUUID();

describe('CryptoService Function Test', () => {
  let token = '';
  const payloadBody = {
    jwtId,
    userId: 10,
    email: 'dmitryneverovski@gmail.com',
  };

  before(() => {
    token = cryptoService.signJWT(payloadBody, JwtConfig.secretAccessToken, {
      expiresIn: JwtConfig.expiresInAccessToken,
    });
  });

  it('Should return', async () => {
    const data = await cryptoService.verifyJWTAsync<JWT>(
      token,
      JwtConfig.secretAccessToken,
    );

    expect(data)
      .to.be.an('object')
      .have.all.keys('userId', 'email', 'jwtId', 'iat', 'exp');

    expect(data.email).to.be.a('string').be.eq(payloadBody.email);
    expect(data.jwtId).to.be.a('string').be.eq(payloadBody.jwtId);
    expect(data.userId).to.be.a('number').be.eq(payloadBody.userId);
  });
});
