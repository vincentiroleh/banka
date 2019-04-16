import chaiHttp from 'chai-http';
import chai, {
  expect,
} from 'chai';

import User from '../models/userModel';

import app from '../app';

chai.use(chaiHttp);

describe('AUTHENTICTION TEST', () => {
  const signupURL = '/api/v1/auth/signup';
  const signinURL = '/api/v1/auth/signin';
  //  Test the POST /auth/signup endpoint
  describe('SIGNUP AUTHENTICTION', () => {
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
    it('should not register a user with a wrong email format', (done) => {
      const user = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'badEmailFormat.com',
        password: 'password',
      };
      chai.request(app)
        .post(signupURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid Email address');
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
  describe('SIGNIN AUTHENTICTION', () => {
    it('should signin a user with email and password', (done) => {
      const user = {
        email: 'iroleh@gmail.com',
        password: '12345678',
      };
      chai.request(app)
        .post(signinURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(200);
          expect(response.body.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.token).to.be.a('string');
          done(error);
        });
    });
    it('should not signin a user without email and password', (done) => {
      const user = {
        email: null,
        password: null,
      };
      chai.request(app)
        .post(signinURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(400);
          expect(response.body.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.be.equal('Email and password is required');
          done(error);
        });
    });
    it('should not signin a user with a wrong email format', (done) => {
      const user = {
        email: 'badEmailFormat.com',
        password: '12345678',
      };
      chai.request(app)
        .post(signinURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid Email address');
          done(error);
        });
    });
    it('should not signin a user with a wrong credentials', (done) => {
      const user = {
        email: 'email@email.com',
        password: 'password',
      };
      chai.request(app)
        .post(signinURL)
        .send(user)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid credentials. Check your email or password');
          done(error);
        });
    });
  });
});
