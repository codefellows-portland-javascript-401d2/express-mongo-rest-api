const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Monster = require('../models/monster.model');
const getTotalRazed = require('../lib/get-total-razed');

router

    .get('/', (req, res) => {
      Monster.find()  
          .then(list => {
            if (list.length > 0) {
              res.json({status: 'success', result: list});
            } else 
              res.json({status: 'error', result: 'There are no monsters yet. Post here to start adding some.'});
          });
    })
    
    .get('/:name', (req, res, next) => {
      const thisName = req.params.name;
      if (thisName === 'totalDestruction') next();
      Monster.find({name: thisName})
          .then(monster => {
            if (monster.length === 0) {
              res.status(404);
              res.json({status: 'error', result: '404: Resource Not Found'});
            } 
            else {
              res.status(200);
              res.json({status: 'success', result: monster});
            }
          });
    })
    
    // collects all citiesRazed data from monster entries and return the SUM
    .get('/totalDestruction', (req, res) => {
      Monster.find({})
        .then(list => {
          var totals = getTotalRazed(list);
          res.json({
            status: 'success',
            result: {
              total_cities_razed: totals.sum,
              list: totals.list 
            }
          });
        }).catch(err => {
          res.json({status: 'error', result: err});
        });
    })
    
    .post('/', bodyParser, (req, res) => {
      new Monster(req.body).save()
          .then(data => {
            res.json({status: 'posted', result: data});
          }).catch(err => {
            var key = Object.keys(err.errors);
            res.json({status: 'error', result: err.errors[key].message});
          });   //specific validation errors in res.send()
    })
    
    .put('/:name', bodyParser, (req, res) => {
      const thisName = req.params.name;
      Monster.findOneAndUpdate({name: thisName}, req.body, 
        {new: true, upsert: true, runValidators: true})
          .then(monster => {
            res.json({status: 'updated', result: monster});
          })
          .catch(err => {
            var key = Object.keys(err.errors);
            res.json({status: 'error', result: err.errors[key].message});
          });
    })
    
    .patch('/:name', bodyParser, (req, res) => {
      const thisName = req.params.name;
      Monster.findOneAndUpdate({name: thisName}, req.body, 
        {new: true, upsert: true, runValidators: true})
          .then(monster => {
            res.json({status: 'updated', result: monster});
          })
          .catch(err => {
            var key = Object.keys(err.errors);
            res.json({status: 'error', result: err.errors[key].message});
          });
    })
    
    .delete('/:name', (req, res) => {
      const thisName = req.params.name;
      Monster.findOneAndRemove({name: thisName})
          .then(monster => {
            if (monster !== null) res.json({status: 'deleted', result: monster});
            else {
              res.json({status: 'error', result: 'Requested monster does not exist.'});
              res.status(404);
            }
          });
    });


module.exports = router;

