const router = require('express').Router();
const Skater = require('../model/skater.js');
// const bodyParser = require('body-parser').json();

var byId = function(req){
  return {_id: req.params.id};
};

function parseValidationMessage (err){
  var errorMessage = 'Error in your JSON input:\n';
  for (var i=0; i< Object.keys(err.errors).length; i++){
    errorMessage += err.errors[Object.keys(err.errors)[i]].message + '\n';
  }
  return errorMessage;
}

router
  .get('/', (req, res) => {
    Skater.find().select('name number')
      .then((skaters) => {
        res.json(skaters);
      });
  })

  .get('/:id',(req, res, next) => {
    Skater.findOne(byId(req))
      .then((skaters) => {
        res.json(skaters);
      })
      .catch( () => {
        next('Failed to find a matching skater ID');
      });
  })

  .put('/:id', (req, res, next) => {
    Skater.findOneAndUpdate(byId(req), req.body, [{new: true}, {upsert: true}])
      .then((skaters) => {
        res.json(skaters);
      })
      .catch( () => {
        next('Failed to find a matching skater ID');
      });
  })

  .delete('/:id', (req, res, next) => {
    Skater.findOneAndRemove(byId(req))
      .then((skaters) => {
        res.send(`${skaters.name} has been removed from the database.`);
      })
      .catch(() => {
        next('Failed to find a matching skater ID');
      });
  })

  .post('/', (req, res, next) =>{
    new Skater(req.body).save()
      .then((skaters) => {
        res.json(skaters);
      })
      .catch( err =>{
        next(err);
      });
  });

module.exports = router;
