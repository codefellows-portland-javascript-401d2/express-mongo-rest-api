const mongoose = require('../lib/setup-mongoose');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);

var connection = mongoose(process.env.M_LAB_MONGO_URI || 'mongodb://localhost/rose-city-rollers');
connection.beQuietEslint = true;

var skater1ID = '';
const skater1 = {
  name: 'Wendy Kill Kill Kill',
  number: 99,
  positions: ['jammer', 'pivot']
};

var team1ID = '';
const team1 = {
  teamName: 'Blood Spillers',
  color: {base: 'black', accent: 'red'}
};

var request;

describe('End to End test', () => {

  before( done => {
    request = chai.request(app.listen(8080));
    done();
  });


  describe('POST methods', () => {

    it('POST to /skaters returns a JSON object with _id field', done => {
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

    it('POST to /teams returns a JSON object with _id field', done => {
      request
      .post('/teams')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(team1))
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.text), '_id', 'has _id field');
        // Save the ID for a later test
        team1ID = JSON.parse(res.text)['_id'];
        done();
      });
    });

  });

  describe('GET methods', () => {

    it('GET /skaters returns a JSON list of skater names, numbers and IDs', done => {
      request
        .get('/skaters')
        .end( (err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
          assert.property(JSON.parse(res.text)[0], 'name', 'has required name field');
          assert.property(JSON.parse(res.text)[0], 'number', 'has required number field');
          done();
        });
    });

    it('GET /skaters/<id> returns a complete JSON description of the skater', done => {
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

    it('GET /teams returns a JSON list of team names, ranks and IDs', done => {
      request
      .get('/teams')
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.text)[0], 'teamName', 'has required name field');
        done();
      });
    });

    it('GET /teams/<id> returns a complete JSON description of the team', done => {
      request
      .get(`/teams/${team1ID}`)
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.text), 'teamName', 'has required name field');
        assert.equal(JSON.parse(res.text).teamName, 'Blood Spillers', 'name value input');
        done();
      });
    });

  });

  describe('PATCH methods', () => {

    skater1['_id'] = '5748b710d2bbfc5e583e3812';
    team1['_id'] = '5748b710d2bbfc5e583e3811';

    it('PATCH /skaters/<id> returns a JSON object after updating skater document', done => {
      request
      .patch(`/skaters/${skater1ID}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(skater1))
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.equal(JSON.parse(res.text)['_id'], skater1['_id'], 'returned _id field matches given input');
        done();
      });
    });

    it('PATCH /teams/<id> returns a JSON object after updating team document', done => {
      request
      .patch(`/teams/${team1ID}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(team1))
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.equal(JSON.parse(res.text)['_id'], team1['_id'], 'returned _id field matches given input');
        done();
      });
    });

  });

  describe('DELETE methods', () => {

    var skaterToDelete = skater1['_id'];
    var teamToDelete = team1['_id'];

    it('DELETE /skaters/<id> returns a message after deleting a specified object', done => {
      request
      .delete(`/skaters/${skaterToDelete}`)
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.text, `${skater1.name} has been removed from the database.`);
        done();
      });
    });

    it('DELETE /teams/<id> returns a message after deleting a specified object', done => {
      request
      .delete(`/teams/${teamToDelete}`)
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.text, `${team1.teamName} has been removed from the database.`);
        done();
      });
    });

  });

  after( () => {
    connection.close();
  });

});
