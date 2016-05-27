const router = require('express').Router();
const Team = require('../model/team.js');

router
.get('/', (req, res) => {
  Team.find().select('teamName rank')
    .then((teams) => {
      res.json(teams);
    });
})

.get('/:id', (req, res, next) => {
  Team.findOne(req.params.id)
    .then((team) => {
      res.json(team);
    })
    .catch( () => {
      next('Failed to find a matching team ID');
    });
})

.patch('/:id', (req, res, next) => {
  Team.findOneAndUpdate(req.params.id, req.body, [{new: true}, {upsert: true}])
    .then((team) => {
      res.json(team);
    })
    .catch( () => {
      next('Failed to find a matching team ID');
    });
})

.delete('/:id', (req, res, next) => {
  Team.findOneAndRemove(req.params.id)
    .then((team) => {
      res.send(`${team.name} has been removed from the database.`);
    })
    .catch(() => {
      next('Failed to find a matching skater ID');
    });
})

.post('/', (req, res, next) =>{
  new Team(req.body).save()
    .then((team) => {
      res.json(team);
    });
    .catch( err =>{
      next(parseValidationMessage(err));
    });
});

module.exports = router;

// GET: /teams/  ->  returns JSON list of all team names (and info?)
// GET: /teams/<id>  ->  returns JSON object of id
// POST: /teams/ (JSON body)  ->  returns JSON object (with db generated fields like id)
// DELETE: /teams/<id>  ->  returns JSON object ... or .... JSON message with name and id of deleted object
// PUT: /teams/<id> (JSON body)  ->  returns JSON object
