const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user.model');
const regex = require('../lib/regex.js');

router
  .get('/', (req, res) => {
    User
      .find()
      .then(users => {
        let resObj = {
          status: 'error',
          result: 'There are no users yet. Post here to start adding some.'
        };

        if (users.length > 0) {
          resObj.status = 'success';
          resObj.result = users;
        }

        res.json(resObj);
      });
  })
  .get('/:name', (req, res) => {
    User
      .findOne({
        name: {
          $regex: regex.new(req.params.name)
        }
      })
      .then(user => {
        let resObj = {
          status: 'error',
          result: `RESOURCE NOT FOUND: ${req.params.name} does not exist.`
        };

        if (user) {
          resObj.status = 'success';
          resObj.result = user;
        }

        res.json(resObj);
      });
  });

router
  .use(bodyParser)
  .post('/', (req, res) => {
    new User(req.body)
      .save()
      .then(user => {
        res.json({
          status: 'posted',
          result: user
        });
      }).catch(err => {
        let key = Object.keys(err.errors);

        res.json({
          status: 'error',
          result: err.errors[key].message
        });
      });
  })
  .put('/:name', (req, res) => {
    User
      .findOneAndUpdate(
        { name: req.params.name},
        req.body,
        { new: true, upsert: true, runValidators: true }
      )
      .then(user => {
        res.json({
          status: 'updated',
          result: user
        });
      })
      .catch(err => {
        let key = Object.keys(err.errors);

        res.json({
          status: 'error',
          result: err.errors[key].message
        });
      });
  })
  .patch('/:name', (req, res) => {
    User
      .findOneAndUpdate(
        { name: req.params.name},
        req.body,
        { new: true, upsert: true, runValidators: true }
      )
      .then(user => {
        res.json({
          status: 'updated',
          result: user
        });
      })
      .catch(err => {
        let key = Object.keys(err.errors);

        res.json({
          status: 'error',
          result: err.errors[key].message
        });
      });
  })
  .delete('/:name', (req, res) => {
    User
      .findOneAndRemove({
        name: regex.new(req.params.name)
      })
      .then(user => {
        let resObj = {
          status: 'error',
          result: `RESOURCE NOT FOUND: ${user} does not exist.`
        };

        if (user) {
          resObj.status = 'deleted';
          resObj.result = user;
        }

        res.json(resObj);
      });
  });

module.exports = router;
