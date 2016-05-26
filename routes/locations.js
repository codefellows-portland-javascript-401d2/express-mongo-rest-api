const router = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();
const Location = require('../models/locations');

router
 .get('/', (req, res) => {
   const query = req.query.type ? {type: req.query.type} : {};
   Location.find(query)
    .select('name family')
    .lean()
    .then( results => res.json(results));
 })
 .get('/:id', (req, res) => {
   Location.findbyId(req.params.id)
    .then(results => res.json(results));
 })
 .post('/', bodyParser, (req, res) => {
   new Location(req.body).save()
    .then(result => res.send(result))
    .catch(error => {
      console.log(error);
      res.json({error});
    });
 })
 .put('/:id', bodyParser, (req, res) => {
   Location.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(result => res.json(result));
 })
 .delete('/:id', (req, res) => {
   Location.findByIdAndRemove(req.params.id)
    .then(result => res.json(result));
 });
