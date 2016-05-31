const router = require('express').Router();
const bodyparser = require('body-parser');
const User = require('../model/user');



router
.post('/signup', bodyparser, (req, res) => {

  // save pass, delete from

  // req body has user and pass
  // create new user, with user


})

.post('/signin', bodyparser, (req, res) => {


});




module.exports = router;
