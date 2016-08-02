const express = require('express');
const app = express();
const morgan = require('morgan');
const people = require('../routes/people');
const locations = require('../routes/locations');

app.use(morgan('dev'));

app.use('/', express.static('public'));
app.use('/people', people);
app.use('/locations', locations);



module.exports = app;
