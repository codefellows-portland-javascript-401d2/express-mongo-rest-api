const express = require('express');
const app = express();
const skaters = require('../routes/skaters.js');
// const teams = require('../routes/teams.js');

// Handle /skaters
app.use('/skaters', skaters);

// Handle /teams
// app.use('/teams', teams);



// Default response for unrecognized requests
app.use( (req, res) => {
  res.status(404).send('404 Error.\n Sorry but I don\'t recogonize your reqeust');
});

// Send Router Error message
app.use( (err, req, res, next) => {
  next.beQuietEslint = true;
  res.send(err);
});

module.exports = app;
