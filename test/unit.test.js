const chai = require('chai');
const Monster = require('../models/monster.model');
const User = require('../models/user.model');

const assert = chai.assert;

describe('Unit Testing', () => {

  describe('Monster Model', () => {

    it('Validates required name field', done => {
      var nameless = new Monster();
      var expected = 'Path `name` is required.';
      nameless.validate((err) => {
        var message = err.errors.name.message;
        assert.equal(message, expected);
        done();
      });
    });

    it('Validates positive numbers for citiesRazed', done => {
      var negativeMonster = new Monster({name: 'negMon', citiesRazed: -1});
      var expected = 'citiesRazed cannot be a negative value';
      negativeMonster.validate((err) => {
        var message = err.errors.citiesRazed.message;
        assert.equal(message, expected);
        done();
      });
    });

  });

  describe('User Model', () => {

    it('Validates required username field', done => {
      var noUser = new User({password: 'abc123'});
      var expected = 'Path `username` is required.';
      noUser.validate((err) => {
        var message = err.errors.username.message;
        assert.equal(message, expected);
        done();
      });
    });
    
    it('Validates required password field', done => {
      var noPass = new User({username: 'user123'});
      var expected = 'Path `password` is required.';
      noPass.validate((err) => {
        var message = err.errors.password.message;
        assert.equal(message, expected);
        done();
      });
    });

  });

});
