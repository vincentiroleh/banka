import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

// ============== ENTRY API ROUTE ============
describe('GET/ test', () => {
  it('should return Welcome to Banka', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Welcome to Banka');
        done(err);
      });
  });
});
