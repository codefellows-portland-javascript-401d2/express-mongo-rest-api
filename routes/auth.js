const router = require('express').Router();
const bodyparser = require('body-parser');
const User = require('../model/user');
const mongoose = require('../lib/setup-mongoose');

// mongoose(process.env.M_LAB_MONGO_URI || 'mongodb://localhost/rose-city-rollers');


router
.post('/signup', bodyparser, (req, res, next) => {

  // req body has user and pass

  // save pass, delete from req.body
  const user = req.body.user;
  const password = req.body.password;
  delete req.body.password;

  mongoose.findOne( {user: user})
    .then( existing => {
      if (existing){
        next('Error: that user name is already registered');
      }else{

        // create new user, with req.body.user
        var user = new User( req.body );

        // create the salted version of the password with the user.instance method
        const hash = user.generateHash(pasword);

        // save the User with salted password
        return user.save()
        .then( () => {

        })
        .catch( () => {
          next('Database failed to save user credentials');
        })
      }
    })



  });



  // error handling if user already exists




})

.post('/signin', bodyparser, (req, res) => {


});




module.exports = router;
