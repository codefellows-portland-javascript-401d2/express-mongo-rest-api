const Team = require('../model/team');

describe('Team', () => {

  it('Validation requires name', done => {
    const teamItem1 = new Team({
      color: {base: 'green', accent: 'black'} // Missing name field, fails validation
    });

    teamItem1.validate( err => {
      if (!err) done('expected name required validation');
      else done();
    });
  });

  it('Validation requires both base and accent colors', done => {

    const teamItem2 = new Team({
      name: 'Smashin\' Napkins',
      color: {base: 'green'}  // Only one color, fails validation
    });

    teamItem2.validate( err => {
      if (!err) done('expected color required validation');
      else done();
    });
  });

  it('Validation needs color strings to match palette array', done => {

    const teamItem3 = new Team({
      name: 'Smashin\' Napkins',
      color: {base: 'green', accent: 'fakeColor'}  // Used an unrecognized color string, fails validation
    });

    teamItem3.validate( err => {
      if (!err) done('expected color required validation');
      else done();
    });
  });

});
