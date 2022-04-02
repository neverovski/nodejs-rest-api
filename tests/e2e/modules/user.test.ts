import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { HttpStatus, CodeResponse, HttpExceptionType } from '@utils';

import { router } from '../lib';

chai.use(chaiHttp);

describe('User API endpoint', () => {
  it('should get 401 without access token', (done) => {
    void chai
      .request('localhost:5858')
      .get(router.users.getCurrent)
      .end((_err, res) => {
        const { message, code, status } =
          CodeResponse[HttpExceptionType.TOKEN_NOT_PROVIDED];

        expect(res.status).to.equal(HttpStatus.Unauthorized);
        expect(res.body).to.have.property('message', message);
        expect(res.body).to.have.property('code', code);
        expect(res.body).to.have.property('status', status);
        done();
      });
  });
});
