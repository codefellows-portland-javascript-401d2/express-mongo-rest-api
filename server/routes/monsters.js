const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Monster = require('../models/monster-schema.model');

router
    .post('/', bodyParser, (req, res) => {
      new Monster(req.body).save()
          .then(data => {
            res.json({posted: data});
          }).catch(err => {
            console.log({error: err});
          });
    });


module.exports = router;
