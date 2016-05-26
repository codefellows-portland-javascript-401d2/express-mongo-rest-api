const Team = require('../model/team');

describe('Team', () => {



  it('requires name', done => {
    const teamItem1 = new Team({
      color: {base: 'green', accent: 'black'}
    });

    teamItem1.validate((err) => {
      if (!err) done('expected name required validation');
      else done();
    });

  });

  it('requires both base and accent colors', done => {

    const teamItem2 = new Team({
      name: 'Smashin\' Napkins',
      color: {base: 'green'}  //only one color, validation will complain
    });

    teamItem2.validate((err) => {
      if (!err) done('expected color required validation');
      else done();
    });

  });

  it('validates color strings', done => {

    const teamItem3 = new Team({
      name: 'Smashin\' Napkins',
      color: {base: 'green', accent: 'fakeColor'}  //only one color, validation will complain
    });

    teamItem3.validate((err) => {
      if (!err) done('expected color required validation');
      else done();
    });

  });


});
