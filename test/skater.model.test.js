const Skater = require('../model/skater');

describe('Skater', () => {

  it('Validation requires name', done => {
    const skaterItem1 = new Skater({
      number: 3  // Missing name, validation will fail
    });

    skaterItem1.validate( err => {
      if (!err) done('Failed to validate missing name');
      else done();
    });
  });

  it('Validation requires number', done => {
    const skaterItem2 = new Skater({
      name: 'Helena'  // Missing number, validation will fail
    });

    skaterItem2.validate( err => {
      if (!err) done('Failed to validate missing number');
      else done();
    });
  });

  it('Validation requires a recognized position', done => {
    const skaterItem3 = new Skater({
      name: 'Marky',
      number: 9,
      positions: ['fakePosition']
    });

    skaterItem3.validate( err => {
      if (!err) done('Failed to validate position string');
      else done();
    });
  });

});
