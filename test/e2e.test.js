const mongoose = require('../lib/setup-mongoose');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);

var connection = mongoose('mongodb://localhost/rose-city-rollers');
connection.beQuietEslint = true;

const skater1 = {
  name: 'Wendy Kill Kill Kill',
  number: 99,
  positions: ['jammer', 'pivot']
};
var skater1ID = '';

var request;

describe('End to End test', () => {

  before( done => {
    request = chai.request(app.listen(8080));
    done();
  });


  describe('POST methods', () => {

    it('POST returns a JSON object with _id field', done => {
      request
        .post('/skaters')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(skater1))
        .end( (err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.property(JSON.parse(res.text), '_id', 'has _id field');
          // Save the ID for a later test
          skater1ID = JSON.parse(res.text)['_id'];
          done();
        });
    });

  });

  describe('GET methods', () => {

    it('GET \'skaters\' returns a JSON list of skater names, numbers and IDs', done => {
      request
        .get('/skaters')
        .end( (err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.property(JSON.parse(res.text)[0], 'name', 'has required name field');
          assert.property(JSON.parse(res.text)[0], 'number', 'had required number field');
          done();
        });
    });

    it('GET \'skaters/<id>\' returns a complete JSON description of the skater', done => {
      request
      .get(`/skaters/${skater1ID}`)
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.text), 'name', 'has required name field');
        assert.property(JSON.parse(res.text), 'number', 'has required number field');
        assert.equal(JSON.parse(res.text).name, 'Wendy Kill Kill Kill', 'name value input');
        done();
      });
    });

  });
});
