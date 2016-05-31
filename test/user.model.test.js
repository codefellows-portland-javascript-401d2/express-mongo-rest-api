const User = require('../model/user');

describe('User', () => {

  it('Validation requires username', done => {
    const user1 = new User({
      password: 'pass'  // Missing username, validation will fail
    });

    user1.validate( err => {
      if (!err) done('Failed to validate missing username');
      else done();
    });
  });

  it('Validation requires password', done => {
    const user2 = new User({
      username: 'Helena'  // Missing number, validation will fail
    });

    user2.validate( err => {
      if (!err) done('Failed to validate missing password');
      else done();
    });
  });

});
