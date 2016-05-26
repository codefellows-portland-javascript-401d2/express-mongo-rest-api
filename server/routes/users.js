const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user.model');
const regex = require('../lib/regex.js');

router
  .get('/', (req, res) => {
    User
      .find()
      .then(users => {
        res.json({
          status: 'success',
          results: users
        });
      });
  })
  .get('/:name', (req, res) => {
    User
      .findOne({
        name: {
          $regex: regex.new(`^${req.params.name}`)
        }
      })
      .then(user => {
        res.json({
          status: 'success',
          results: user
        });
      });
  });

router
  .use(bodyParser)
  .post('/', (req, res) => {
    new User(req.body)
      .save()
      .then(data => {
        res.json({
          status: 'success',
          results: data
        });
      });
  })
  // Update everything or create
  .put('/:name', (req, res) => {
    User
      .findOneAndUpdate(
        {name: req.params.name},
        req.body,
        {new: true}
      )
      .then(user => {
        res.json({
          status: 'success',
          results: user
        });
      });
  })
  // Update one field
  .patch('/:name', (req, res) => {
  })
  ,delete('/:name', (req, res) => {
    User
      .findOneAndRemove({
        name: req.params.name
      })
      .then(user => {
        res.json({
          status: 'success',
          results: user
        });
      });
  });

module.exports = router;
