const express = require('express');
const app = express();
const users = require('./routes/users');
const monsters = require('./routes/monsters');

app.set('case sensitive routing', false);
app.use('/users', users);
app.use('/monsters', monsters);
app.use((req, res) => {
  res
    .status(404)
    .json({
      status: 'error',
      results: 'Page not found'
    });
});

module.exports = app;
