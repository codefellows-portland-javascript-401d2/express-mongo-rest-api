const router = require('express').Router();
const Team = require('../model/team');


function updateMatchRecord(teamID, type, cb){
  var query = {};
  query[type] = 1;
  Team.findOneAndUpdate(teamID, {$inc: query}, [{new: true}], (err, doc) => {
    cb(err, doc);
  });
}

router
  .patch('/', (req, res, next) => {
    var returnArray = [];
    updateMatchRecord({_id: req.body.winner}, 'currentWins', (err, doc) => {
      if (err) next('Failed to save win');
      returnArray.push(doc);
      updateMatchRecord({_id: req.body.loser}, 'currentLosses', (err, doc) => {
        if (err) next('Failed to save loss');
        returnArray.push(doc);
        res.send(returnArray);
      });
    });
  });

  // .get('standings')

module.exports = router;
