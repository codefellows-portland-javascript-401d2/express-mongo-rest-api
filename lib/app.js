const express = require('express');
const handlers = require('../routes/handlers');
const users = require('../routes/users');
const monsters = require('../routes/monsters');
const auth = require('../routes/authenticate');
const tokenChecker = require('./token-checker');

const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('../views/pages/index.page.pug');
});
app.use(handlers.json);
app.use('/', auth);
app.use('/users', users);
app.use('/monsters', /*tokenChecker,*/ monsters);
app.use(handlers.error);

module.exports = app;
