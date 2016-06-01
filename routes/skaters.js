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
  return {status: 400, msg:'400 Bad Request: ' + errorMessage};
}

router
  .get('/', (req, res, next) => {
    const query = req.query.retired ? {retired: req.query.retired} : {};
    //tried to look into query string for positions (array)
    Skater.find(query).select('name number')
      .then((skaters) => {
        res.json(skaters);
      }).catch( () => {
        next({status: 500, msg:'500 Internal Server Error: Failed retrieve resources'});
      });
  })

  .get('/:id',(req, res, next) => {
    Skater.findOne(byId(req))
      .then((skaters) => {
        res.json(skaters);
      })
      .catch( () => {
        next({status: 400, msg:'400 Bad Request: Failed to find a matching skater ID'});
      });
  })

  .patch('/:id', (req, res, next) => {
    Skater.findOneAndUpdate(byId(req), req.body, [{new: true}, {upsert: true}])
      .then((skaters) => {
        res.json(skaters);
      })
      .catch( () => {
        next({status: 400, msg:'400 Bad Request: Failed to find a matching skater ID'});
      });
  })

  .delete('/:id', (req, res, next) => {
    Skater.findOneAndRemove(byId(req))
      .then((skaters) => {
        res.send(`${skaters.name} has been removed from the database.`);
      })
      .catch(() => {
        next({status: 400, msg:'400 Bad Request: Failed to find a matching skater ID'});
      });
  })

  .post('/', (req, res, next) =>{
    new Skater(req.body).save()
      .then((skaters) => {
        res.json(skaters);
      })
      .catch((err) => {
        next(parseValidationMessage(err));
      });
  });

module.exports = router;
