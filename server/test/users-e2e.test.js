// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app');

// const assert = chai.assert;

// chai.use(chaiHttp);

// describe('End to end testing for users', () => {
//   let request;

//   before(done => {
//     request = chai.request(app);
//     done();
//   });

//   it('GETs all users', done => {
//     request
//       .get('/users')
//       .set('Content-Type', 'application/json')
//       .then(res => {
//         let resParse = JSON.parse(res.text);

//         assert.equal(res.status, 200);
//         assert.property(resParse, 'status');
//         assert.property(resParse, 'results');
//         assert.equal(resParse.status, 'success');
//         assert.isArray(resParsed.results);

//         resParsed.results.forEach(user => {
//           assert.property(user, '_id');
//           assert.property(user, 'name');
//           assert.property(user, 'favoriteMonsters');
//           assert.isArray(user.favoriteMonsters);
//           assert.property(user, 'createdAt');
//           assert.property(user, 'updatedAt');
//         });

//         done();
//       });
//   });
// });
