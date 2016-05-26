const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Skater = require('../model/skater.js');

var byId = function(req){
  return req.params.id;
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

  .post('/skaters', bodyParser, (req, res) =>{
    new Skater(req.body).save()
      .then((skater) => {
        res.json(skater);
      })
      .catch(err =>{
        console.log(err);
        res.json(err);
      });
  });



//.put


//.delete


//.patch

module.exports = router;
// GET: /skaters/  ->  returns JSON list of all skater names (and info?)
// GET: /skaters/<id>  ->  returns JSON object of id
// POST: /skaters/ (JSON body)  ->  returns JSON object (with db generated fields like id)
// DELETE: /skaters/<id>  ->  returns JSON object ... or .... JSON message with name and id of deleted object
// PUT: /skaters/<id> (JSON body)  ->  returns JSON object
