const router = require('express').Router();
const User = require('../model/user');
const token = require('../lib/token');

router
.post('/signup', (req, res, next) => {

  if (!req.body.password){
    next({status: 401, msg:'401 Unauthorized: Please provide a password'});
    return;
  }

  const username = req.body.username;
  const password = req.body.password;
  delete req.body.password;

  User.findOne( {username: username})
  .then( existing => {
    if (existing){
      next({status: 401, msg:'401 Unauthorized: That user name is already registered'});
    }else{
      var user = new User( req.body );
      user.generateHash(password);

      return user.save()
      .then( user =>  token.sign(user))
      .then( token => res.json({token}))
      .catch( () => next({status: 500, msg:'500 Internal Server Error: Failed to save user credentials'}));
    }
  })
  .catch( () =>  next({status: 500, msg:'500 Internal Server Error: Failed to save user credentials'}));
})

.post('/signin', (req, res, next) => {

  if (!req.body.password){
    next({status: 401, msg:'401 Unauthorized: Please provide a password'});
    return;
  }

  const username = req.body.username;
  const password = req.body.password;
  delete req.body.password;

  User.findOne( {username: username})
  .then( user => {

    if (!user){
      next ({status: 401, msg:'401 Unauthorized: Failed to find that username and password'});
      return;
    }

    if (!user.compareHash(password)){
      next ({status: 401, msg:'401 Unauthorized: Failed to find that username and password'});
      return;
    }

    token.sign(user)
    .then( token => res.json({token}));
  })
  .catch( () => {
    next({status: 500, msg:'500 Internal Server Error: Failed to validate credentials'});
  });
});

module.exports = router;
