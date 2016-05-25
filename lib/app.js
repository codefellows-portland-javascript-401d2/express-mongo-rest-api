const express = require('express');
const app = express();
const skaters = require('../routes/skaters.js');
const teams = require('../routes/teams.js');

app.use('/skaters', skaters);

// app.use('/teams', teams);

module.exports = app;
