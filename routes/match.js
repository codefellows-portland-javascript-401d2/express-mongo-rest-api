const router = require('express').Router();
const Team = require('../model/team');


function updateMatchRecord(teamID, type, cb){
  var query = {};
  query[type] = 1;
  Team.findOneAndUpdate(teamID, {$inc: query}, {new: true}, (err, doc) => {
    cb(err, doc);
  });
}

router
  .patch('/', (req, res, next) => {
    if ((!req.body.winner) || (!req.body.loser)) {
      next({status: 400, msg:'400 Bad Request: Failed to parse JSON'});
      return;
    }

    var returnArray = [];
    updateMatchRecord({_id: req.body.winner}, 'currentWins', (err, doc) => {
      if (err) next({status: 400, msg:'400 Bad Request: Failed to save win'});
      else{
        returnArray.push(doc);
        updateMatchRecord({_id: req.body.loser}, 'currentLosses', (err, doc) => {
          if (err) next({status: 400, msg:'400 Bad Request: Failed to save loss'});
          else{
            returnArray.push(doc);
            res.send(returnArray);
          }
        });
      }
    });
  });

module.exports = router;
