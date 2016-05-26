const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require ('../lib/setup-mongoose');
const assert = chai.assert;
chai.use(chaiHttp);

const testData = {
  name: 'Eddard Stark',
  allegiance: 'Stark',
  alive: false,
  home: '57461ec3ec025fa01f91c0ed',
  killed_by: 'Joffrey Baratheon'
};

var id;

describe('integration', () => {
  const request = chai.request(app);
  let id;
  describe('POST', () => {
    it('inserts record', done => {
      request
        .post('/people')
        .send(testData)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          id = result._id;
          assert.isObject(result);
          assert.propertyVal(result, 'name', 'Eddard Stark');
          done();
        });
    });


  });
  describe('GET', () => {
    it('retrieves the record', done => {
      request
        .get(`/people/${id}`)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          assert.isObject(result);
          assert.propertyVal(result, '_id', id);
          done();
        });
    });
  });
  describe('PUT', () => {

    it('modifies the record', done => {
      request.get(`/people/${id}`).end((err, res) => {
        const record = JSON.parse(res.text);
        record.name = 'Ned Stark';
        request
          .put(`/people/${id}`)
          .send(record)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            assert.isObject(result);
            assert.propertyVal(result, 'name', 'Ned Stark');
            done();
          });
      });
    });
  });

  describe('DELETE', () => {

    it('removes the record', done => {
      request.delete(`/people/${id}`).end((err, res) => {
        const result = JSON.parse(res.text);
        assert.isObject(result);
        assert.propertyVal(result, '_id', id);
        request
          .get(`/people/${id}`)
          .end((err, res) => {
            const getResult = JSON.parse(res.text);
            assert.isObject(getResult);
            const expectedMessage = {error: { message: 'Entry not found'}};
            assert.deepEqual(getResult, expectedMessage);

            done();
          });
      });
    });
  });



});
