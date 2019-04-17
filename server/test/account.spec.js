import chaiHttp from 'chai-http';
import chai, {
  expect,
} from 'chai';
import app from '../app';

chai.use(chaiHttp);

describe('ACCOUNT CONTROLLER TEST', () => {
  const createAccountURL = '/api/v1/accounts';
  describe('Creating Account', () => {
    it('should register user', (done) => {
      const data = {
        accountNumber: 1234567896,
        createdOn: Number,
        type: 'savings',
        openingBalance: 10000,
      };
      chai.request(app)
        .post(createAccountURL)
        .send(data)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(201);
          done(error);
        });
    });
    it('should not register user without type of account', (done) => {
      const data = {
        openingBalance: 10000,
      };
      chai.request(app)
        .post(createAccountURL)
        .send(data)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Type of account required');
          done(error);
        });
    });
    it('should not register user without opening balance', (done) => {
      const data = {
        type: 'savings',
      };
      chai.request(app)
        .post(createAccountURL)
        .send(data)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.equal('Opening balance required');
          done(error);
        });
    });
  });
});
