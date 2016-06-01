const router = require('express').Router();
const User = require('../model/user.js');
const bodyParser = require('body-parser').json();

router
  .post('/:userId/roles/:role', (req, res) => {
    User.findById(req.params.userId)
      .then((user) => {
        if(!user){
          console.err('User not found');
        }

        const role = req.params.role;
        if(user.roles.indexOf(role) !== -1){
          return user;
        } else {
          user.roles.push(role);
          return user.save();
        }
      })
      .then((user) => {
        res.json({
          id: user.id,
          roles: user.roles
        })
      .catch((err) => {
        res.status(500).json({
          msg: 'failed to add user role',
          error: err
        });
      });
      });
  });

module.exports = router;
