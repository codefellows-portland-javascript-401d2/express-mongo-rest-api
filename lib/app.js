const express = require('express');
const app = express();
const skaters = require('../routes/skaters.js');
const teams = require('../routes/teams.js');

app.use('/', skaters);

// app.use('/teams', teams);

app.use( (err, req, res, next) => {
  next.beQuietEslint = true;

  res.send(err);

});

module.exports = app;
