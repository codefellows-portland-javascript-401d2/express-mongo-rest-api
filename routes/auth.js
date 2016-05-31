const router = require('express').Router();
const User = require('../model/user');
const token = require('../lib/token');

router
.post('/signup', (req, res, next) => {

  if (!req.body.password){
    next('Please provide a password');
    return;
  }

  const username = req.body.username;
  const password = req.body.password;
  delete req.body.password;

  User.findOne( {username: username})
  .then( existing => {
    if (existing){
      next('Error: that user name is already registered');
    }else{
      var user = new User( req.body );
      user.generateHash(password);

      return user.save()
      .then( user =>  token.sign(user))
      .then( token => res.json({token}))
      .catch( () => next('Database failed to save user credentials'));
    }
  })
  .catch( () =>  next('Database failed to save user credentials'));
})

.post('/signin', (req, res) => {


});

module.exports = router;
