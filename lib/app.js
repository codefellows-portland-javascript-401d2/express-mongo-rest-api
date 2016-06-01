const express = require('express');
const app = express();

const skaters = require('../routes/skaters.js');
const teams = require('../routes/teams.js');
const match = require('../routes/match.js');
const auth = require('../routes/auth.js');
const users = require('../routes/users.js');

const bodyParser = require('body-parser').json();
const ensureAuth = require('./ensureAuth');
const ensureRoles = require('./ensureRoles');

// BodyParse
app.use(bodyParser);

// Authentication - Sign up and sign in
app.use('/', auth);

//Handle /roles for users
app.use('/user', users);

// Handle /skaters
app.use('/skaters', ensureAuth, ensureRoles('coach'), skaters);

// Handle /teams
app.use('/teams', ensureAuth, teams);

app.use('/match',ensureAuth,  match);

// Default response for unrecognized requests
app.use( (req, res) => {
  res.status(404).json({Error: '404 Not Found: Sorry but I don\'t recogonize your request'});
});

// Send Router Error message
app.use( (err, req, res, next) => {
  next.beQuietEslint = true;
  res.status(err.status || 404).json({Error: err.msg || err});
});

module.exports = app;
