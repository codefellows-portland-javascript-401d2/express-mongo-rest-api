const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Skater = require('../model/skater.js');

var byId = function(req){
  return {_id: req.params.id};
};

router
  .get('/skaters', (req, res) => {
    Skater.find().select('name number')
      .then((skaters) => {
        res.json(skaters);
      });
  })

  .get('/skaters/:id',(req, res) => {
    Skater.findOne(byId(req))
      .then((skaters) => {
        res.json(skaters);
      });
  })

  .put('/skaters/:id', bodyParser, (req, res) => {
    Skater.findOneAndUpdate(byId(req), req.body, [{new: true}, {upsert: true}])
      .then((skaters) => {
        res.json(skaters);
      });
  })

  .post('/skaters', bodyParser, (req, res) =>{
    new Skater(req.body).save()
      .then((skaters) => {
        res.json(skaters);
      })
      .catch(err =>{
        console.log(err);
        res.json(err);
      });
  });


//.patch

module.exports = router;
// POST: /skaters/ (JSON body)  ->  returns JSON object (with db generated fields like id)
// DELETE: /skaters/<id>  ->  returns JSON object ... or .... JSON message with name and id of deleted object
// PUT: /skaters/<id> (JSON body)  ->  returns JSON object
