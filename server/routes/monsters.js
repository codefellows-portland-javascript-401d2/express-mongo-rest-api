const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Monster = require('../models/monster-schema.model');

router

    .get('/', (req, res) => {
      Monster.find()  
          .then(list => {
            res.json(list);
          });
    })
    
    .get('/:name', (req, res) => {
      const thisName = req.params.name;
      Monster.find({name: thisName})
          .then(monster => {
            res.json(monster);
          });
    })
    
    .put('/:name', bodyParser, (req, res) => {
      const thisName = req.params.name;
      Monster.findOneAndUpdate({name: thisName}, req.body, {new: true})
          .then(monster => {
            res.json({updated: monster});
          });
    })
    
    .delete('/:name', (req, res) => {
      const thisName = req.params.name;
      Monster.findOneAndRemove({name: thisName})
          .then(monster => {
            res.json({removed: monster});
          });
    })

    .post('/', bodyParser, (req, res) => {
      new Monster(req.body).save()
          .then(data => {
            res.json({posted: data});
          }).catch(err => {
            console.log({error: err});
          });
    });

module.exports = router;