const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const database = require('../lib/database');
const Monster = require('../models/monster-schema.model');
const dbUri = process.env.DB_URI || 'mongodb://localhost/godzilla';
const app = require('../app');
database.connect(dbUri);
chai.use(chaiHttp);

describe('end to end testing', () => {
    
  var request = chai.request(app);
  
  before(done => { // Wipes collection
    Monster.remove({})
    .then(done());
  });
    
  it('posts one item to db', done => {
    var monster = 'Mothra';
    request.post('/monsters')
            .send({name: monster, citiesRazed: 25})
            .end((err, res) => {
              var resObj = JSON.parse(res.text);
              assert.equal(resObj.posted.name, monster);
              done(); 
            });
        
  });
    
  it('posts another item and gets two items', done => {
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
  
  it('/totalDestruction returns sum of all citiesRazed', done => {
    var expected = 75; // From the two posts above, we combine 25 and 50
    request
        .get('/monsters/totalDestruction')
        .end((err, res) => {
          var parse = JSON.parse(res.text);
          var resTotal = parse.total_cities_razed;
          assert.equal(resTotal, expected);
          done();
        });
  });
  
  it('throws specific validation error on name requirement', done => {
    const expected = 'Path `name` is required.';
    request
        .post('/monsters')
        .send({'citiesRazed': 300})
        .end((err, res) => {
          const parsed = JSON.parse(res.text);
          assert.deepEqual(parsed.error, expected);
          done();
        });
  });
    
  it('throws specific validation error on negative number', done => {
    const expected = 'citiesRazed cannot be a negative value';
    request
        .post('/monsters')
        .send({'name': 'Zilla', 'citiesRazed': -1})
        .end((err, res) => {
          const parsed = JSON.parse(res.text);
          assert.deepEqual(parsed.error, expected);
          done();
        });
  });  
    
  it('gets one single item', done => {
    request
        .get('/monsters/Mothra')
        .end((err, res) => {
          var parsed = JSON.parse(res.text);
          assert.equal(parsed.result[0].name, 'Mothra');
          done();
        });
  });
  
  it('PUTS, doubles citiesRazed count from 50 to 100', done => {
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
    
  it('deletes one, then the other', done => {
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