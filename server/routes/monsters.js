const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Monster = require('../models/monster-schema.model');

router

    .get('/', (req, res) => {
      Monster.find()  
          .then(list => {
            if (list.length > 0) {
              res.json({result: list});
            } else 
              res.json({result: 'There are no monsters yet. Post here to start adding some.'});
          });
    })
    
    .get('/:name', (req, res) => {
      const thisName = req.params.name;
      Monster.find({name: thisName})
          .then(monster => {
            if (monster.length === 0) {
              res.status(404);
              res.json({result: '404: Resource Not Found'});
            } 
            else {
              res.status(200);
              res.json({result: monster});
            }
          });
    })
    
    .post('/', bodyParser, (req, res) => {
      new Monster(req.body).save()
          .then(data => {
            res.json({posted: data});
          }).catch(err => {
            var key = Object.keys(err.errors);
            res.json({error: err.errors[key].message});
          });   //specific validation errors in res.send()
    })
    
    .put('/:name', bodyParser, (req, res) => {
      const thisName = req.params.name;
      Monster.findOneAndUpdate({name: thisName}, req.body, 
        {new: true, upsert: true, runValidators: true})
          .then(monster => {
            res.json({updated: monster});
          })
          .catch(err => {
            var key = Object.keys(err.errors);
            res.json({error: err.errors[key].message});
          });
    })
    
    .patch('/:name', bodyParser, (req, res) => {
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
            if (monster !== null) res.json({removed: monster});
            else {
              res.json({error: 'Requested monster does not exist.'});
              res.status(404);
            }
          });
    });


module.exports = router;

