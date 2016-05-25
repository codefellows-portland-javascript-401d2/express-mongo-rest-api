const express = require('express');
const app = express();
const users = require('./routes/users');
const monsters = require('./routes/monsters');

app.use('/users', users);

app.use('/monsters', monsters);

module.exports = app;
