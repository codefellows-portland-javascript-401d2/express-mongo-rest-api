const express = require('express');
const handlers = require('../routes/handlers');
const users = require('../routes/users');
const monsters = require('../routes/monsters');

const app = express();

app.use(handlers.json);
app.use('/users', users);
app.use('/monsters', monsters);
app.use(handlers.error);

module.exports = app;
