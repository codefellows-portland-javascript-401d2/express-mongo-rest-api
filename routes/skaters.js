const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Skater = require('../model/skater.js');

var byId = function(req){
  return {_id: req.params.id};
};

function parseErrorMessage (err){
  var errorMessage = 'Error in your JSON input:\n';
  for (var i=0; i< Object.keys(err.errors).length; i++){
    errorMessage += err.errors[Object.keys(err.errors)[i]].message + '\n';
  }
  return errorMessage;
}

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

  .post('/skaters', bodyParser, (req, res, next) =>{
    new Skater(req.body).save()
      .then((skaters) => {
        res.json(skaters);
      })
      .catch( err =>{
        next(parseErrorMessage(err));
      });
  });


//.patch

module.exports = router;
// POST: /skaters/ (JSON body)  ->  returns JSON object (with db generated fields like id)
// DELETE: /skaters/<id>  ->  returns JSON object ... or .... JSON message with name and id of deleted object
// PUT: /skaters/<id> (JSON body)  ->  returns JSON object
