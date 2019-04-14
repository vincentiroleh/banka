import chaiHttp from 'chai-http';
import chai, {
  expect,
} from 'chai';

import User from '../server/models/user.model';

import app from '../server/app';

chai.use(chaiHttp);

describe('USER CONTROLLER', () => {
  //  Test the POST /auth/signup endpoint
  describe('signup authentication', () => {
    const signupURL = '/api/v1/auth/signup';

    it('should register a new user when all the parameters are given', (done) => {
      const user = {
        id: User.length + 1,
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'example@email.com',
        password: 'password',
      };
      chai.request(app)
        .post(signupURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('object');
          expect(response.body).to.be.an('object');
          expect(response.body.data.token).to.be.a('string');
          done(error);
        });
    });

    it('should not register a user when the email is missing', (done) => {
      const user = {
        firstName: 'First Name',
        lastName: 'Last Name',
        password: 'password',
      };
      chai.request(app)
        .post(signupURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done(error);
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      const user = {
        lastName: 'Last Name',
        email: 'example@email.com',
        password: 'password',
      };
      chai.request(app)
        .post(signupURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First Name is required');
          done(error);
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      const user = {
        firstName: 'First Name',
        email: 'example@email.com',
        password: 'password',
      };
      chai.request(app)
        .post(signupURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last Name is required');
          done(error);
        });
    });

    it('should not register a user when the password is missing', (done) => {
      const user = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'example@email.com',
      };
      chai.request(app)
        .post(signupURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done(error);
        });
    });
  });

  //  Test the POST /auth/signin endpoint
});
