const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const database = require('../lib/database');
const app = require('../lib/app');
const DB_URI = process.env.DB_URI || 'mongodb://localhost/godzilla';

const Monster = require('../models/monster.model');
const User = require('../models/user.model');

describe('Authentication', () => {
  var request = chai.request(app);
  
  before(done => {
    database.connect(DB_URI);
    User.remove({})
      .then(done());
  });
  
  it ('registers new user on /signup', done => {
    const user1 = {"username": "user1", "password": "test123"};
    const expected = 'user: user1 created';
    request
      .post('/signup')
      .send(user1)
      .end((err, res) => {
        const actual = JSON.parse(res.text);
        assert.equal(actual.status, 'success');
        assert.equal(actual.result, expected);
        done();
      });
  });
  
  it ('error on duplicate username input on /signup', done => {
    const user1 = {"username": "user1", "password": "test123"};
    const expected = 'Username: user1 already exists';
    request
      .post('/signup')
      .send(user1)
      .end((err, res) => {
        const actual = JSON.parse(res.text);
        assert.equal(actual.status, 'error');
        assert.equal(actual.result, expected);
        done();
      });
  });
  
  it ('user success on /signin', done => {
    const user1 = {"username": "user1", "password": "test123"};
    request
      .post('/signin')
      .send(user1)
      .end((err, res) => {
        const actual = JSON.parse(res.text);
        assert.equal(actual.status, 'success');
        done();
      });
  });
  
  it ('error on password mismatch on /signin', done => {
    const user1 = {"username": "user1", "password": "wrong"};
    request
      .post('/signin')
      .send(user1)
      .end((err, res) => {
        const actual = JSON.parse(res.text);
        assert.equal(actual.status, 'error'); 
        assert.equal(actual.result, 'Forbidden'); 
        done();
      });
  });
  
  it ('error on bad username on /signin', done => {
    const user1 = {"username": "not_a_user", "password": "test123"};
    request
      .post('/signin')
      .send(user1)
      .end((err, res) => {
        const actual = JSON.parse(res.text);
        assert.equal(actual.status, 'error');
        assert.equal(actual.result, 'Username Not Found');
        done();
      });
  });
  
});

