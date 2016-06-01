const express = require('express');
const app = express();
const skaters = require('../routes/skaters.js');
const teams = require('../routes/teams.js');
const match = require('../routes/match.js');
const auth = require('../routes/auth.js');
const bodyParser = require('body-parser').json();
const ensureAuth = require('./ensureAuth');

// BodyParse
app.use(bodyParser);

// Authentication - Sign up and sign in
app.use('/', auth);

// Handle /skaters
app.use('/skaters', ensureAuth, skaters);

// Handle /teams
app.use('/teams', ensureAuth, teams);

app.use('/match',ensureAuth,  match);

// Default response for unrecognized requests
app.use( (req, res) => {
  res.status(404).json({Error: '405 Method Not Allowed: Sorry but I don\'t recogonize your request'});
});

// Send Router Error message
app.use( (err, req, res, next) => {
  next.beQuietEslint = true;
  res.status(err.status || 404).json({Error: err.msg || err});
});

module.exports = app;
