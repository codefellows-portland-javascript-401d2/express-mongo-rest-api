const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const database = require('../lib/database');
const dbUri = process.env.DB_URI || 'mongodb://localhost/godzilla';
const app = require('../app');
database.connect(dbUri);

describe('end to end testing', () => {
    
  var request = chai.request(app);
    
  it('posts one item to db', done => {
    var monster = 'Mothra';
    request.post('/monsters')
            .send({name: monster})
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
         .then(result => {
           request.get('/monsters')
                .end((err, res) => {
                  var parse = JSON.parse(res.text);
                  assert.equal(parse.result.length, 2);
                  done();
                });   
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
        .then(result => {
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