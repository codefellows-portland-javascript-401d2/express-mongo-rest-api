const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user-schema.model.js');

let obj = {
  test: 'test'
};

router
  .get('/', (req, res) => {
    res.json(obj);
  })
  .get('/:id', (req, res) => {
    res.json(obj);
  });

router
  .use(bodyParser)
  .post('/', (req, res) => {
    res.json(obj);
  })
  .put('/:id', (req, res) => {
    res.json(obj);
  })
  ,delete('/:id', (req, res) => {
    res.json(obj);
  });
