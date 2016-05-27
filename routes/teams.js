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
    })
    .catch( err =>{
      next(err);
    });
});

module.exports = router;
