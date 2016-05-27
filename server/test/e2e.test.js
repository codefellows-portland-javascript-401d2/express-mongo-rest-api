const chai = require('chai');
const chaiHttp = require('chai-http');
const database = require('../lib/database');
const Monster = require('../models/monster.model');
const User = require('../models/user.model');
const app = require('../app');

const assert = chai.assert;
const DB_URI = process.env.DB_URI || 'mongodb://localhost/godzilla';

database.connect(DB_URI);
chai.use(chaiHttp);

describe('End to End Testing', () => {

  let request;

  before(done => { // Wipes collection
    request = chai.request(app);
    Monster.remove({})
    .then(done());
  });

  describe('Monster', () => {

    it('Posts one item to db', done => {
      let monster = 'Mothra';
      request.post('/monsters')
        .send({name: monster, citiesRazed: 25})
        .end((err, res) => {
          let resObj = JSON.parse(res.text);
          assert.equal(resObj.result.name, monster);
          done();
        });
    });

    it('Posts another item and gets two items', done => {
      var monster = 'Destroyah';
      request
        .post('/monsters').send({name: monster, citiesRazed: 50})
        .then(() => {
          request.get('/monsters')
            .end((err, res) => {
              var parse = JSON.parse(res.text);
              assert.equal(parse.result.length, 2);
              done();
            });
        });
    });

    it('Returns sum of all citiesRazed', done => {
      var expected = 75; // From the two posts above, we combine 25 and 50
      request
        .get('/monsters/totalDestruction')
        .end((err, res) => {
          var parse = JSON.parse(res.text);
          var resTotal = parse.result.total_cities_razed;
          assert.equal(resTotal, expected);
          done();
        });
    });

    it('Throws specific validation error on name requirement', done => {
      const expected = 'Path `name` is required.';
      request
        .post('/monsters')
        .send({'citiesRazed': 300})
        .end((err, res) => {
          const parsed = JSON.parse(res.text);
          assert.deepEqual(parsed.result, expected);
          done();
        });
    });

    it('Throws specific validation error on negative number', done => {
      const expected = 'citiesRazed cannot be a negative value';
      request
        .post('/monsters')
        .send({'name': 'Zilla', 'citiesRazed': -1})
        .end((err, res) => {
          const parsed = JSON.parse(res.text);
          assert.deepEqual(parsed.result, expected);
          done();
        });
    });

    it('Gets one single item', done => {
      request
        .get('/monsters/Mothra')
        .end((err, res) => {
          var parsed = JSON.parse(res.text);
          assert.equal(parsed.result[0].name, 'Mothra');
          done();
        });
    });

    it('Puts, doubles citiesRazed count from 50 to 100', done => {
      request
        .put('/monsters/Destroyah')
        .send({citiesRazed: 100})
        .then(() => {
          request.get('/monsters/Destroyah')
            .end((err, res) => {
              var parsed = JSON.parse(res.text);
              assert.equal(parsed.result[0].citiesRazed, 100);
              done();
            });
        });
    });

    it('Deletes one, then the other', done => {
      var expected = 'There are no monsters yet. Post here to start adding some.';
      request
        .del('/monsters/Destroyah')
        .then(() => {
          request
            .del('/monsters/Mothra')
            .then(() => {
              request.get('/monsters')
                .end((err, res) => {
                  var parsed = JSON.parse(res.text);
                  assert.equal(parsed.result, expected);
                  done();
                });
            });
        });
    });

  });

  describe('User', () => {

    it('Gets all users', done => {
      request
        .get('/users')
        .set('Content-Type', 'application/json')
        .then(res => {
          let resParse = JSON.parse(res.text);

          assert.equal(res.status, 200);
          assert.property(resParse, 'status');
          assert.property(resParse, 'results');
          assert.equal(resParse.status, 'success');
          assert.isArray(resParse.results);

          resParse.results.forEach(user => {
            assert.property(user, '_id');
            assert.property(user, 'name');
            assert.property(user, 'favoriteMonsters');
            assert.isArray(user.favoriteMonsters);
            assert.property(user, 'createdAt');
            assert.property(user, 'updatedAt');
          });

          done();
        });
    });

  });

});
