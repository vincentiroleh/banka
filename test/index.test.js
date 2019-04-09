import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server/app';

chai.use(chaiHttp);
chai.should();

describe('Welcome note', () => {
  it('it should return Welcome to banka', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.text.should.be.eql('Welcome to banka');
        done();
      });
  });
});
