const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user.model');

router
  .post('/signup', jsonParser, (req, res) => {
    const input = {
      username: req.body.username, 
      password: req.body.password
    };
    
    delete req.body.password;
    
    User.findOne({username: input.username})
      .then((foundUser) => { 
        if (foundUser !== null) return res.json({status: 400, result: `Username: ${foundUser.username} already exists`});

        const newUser = new User({username: input.username});
        newUser.makeHash(input.password);
        return newUser.save()
          .then(user => {
            res.json({status: 'success', result: `user: ${user.username} created`});
          })
          .catch(err => {
            res.json({status: 'error', result: err});
          });
 
      }).catch(err => {
        res.json({status: ' shit error', result: err});
      });
      
      
     
      
  });
  
module.exports = router;