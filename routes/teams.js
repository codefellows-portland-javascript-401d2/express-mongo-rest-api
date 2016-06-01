const router = require('express').Router();
const Team = require('../model/team.js');
const Skater = require('../model/skater.js');

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
  const query = req.query.rank ? {rank: req.query.rank} : {};
  Team.find(query).select('teamName rank')
    .then((teams) => {
      res.json(teams);
    }).catch( () => {
      next({status: 500, msg:'500 Internal Server Error: Failed retrieve resources'});
    });
})

.get('/:id', (req, res, next) => {
  Team.findOne(byId(req))
    .then((team) => {
      res.json(team);
    })
    .catch( () => {
      next({status: 400, msg:'400 Bad Request: Failed to find a matching team ID'});
    });
})

.get('/:id/roster', (req, res, next) =>{
  Skater.find({team: byId(req)})
    .then((skaters) => {
      res.json(skaters);
    })
    .catch( () => {
      next({status: 400, msg:'400 Bad Request: No skaters found'});
    });
})

.patch('/:id', (req, res, next) => {
  Team.findOneAndUpdate(byId(req), req.body, [{new: true}, {upsert: true}])
    .then((team) => {
      res.json(team);
    })
    .catch( () => {
      next({status: 400, msg:'400 Bad Request: Failed to find a matching team ID'});
    });
})

.delete('/:id', (req, res, next) => {
  Team.findOneAndRemove(byId(req))
    .then((team) => {
      res.send(`${team.teamName} has been removed from the database.`);
    })
    .catch(() => {
      next({status: 400, msg:'400 Bad Request: Failed to find a matching team ID'});
    });
})

.post('/', (req, res, next) =>{
  new Team(req.body).save()
    .then((team) => {
      res.json(team);
    })
    .catch( err =>{
      next(parseValidationMessage(err));
    });
});

module.exports = router;
