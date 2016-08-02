const Location = require('../models/locations.js');

describe('Location model', () => {
  it('requires name', done => {
    const place = new Location();
    place.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const place = new Location({name: 'Winterfell', family:'Stark', region:'North'});
    place.validate()
    .then(done)
    .catch(done);
  });

});
