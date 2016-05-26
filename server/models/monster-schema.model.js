var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = mongoose.model('Monster', new Schema({
  name: {
    type: String,
    required: true
  },
  citiesRazed: {
    type: Number,
    min: [0, 'citiesRazed cannot be a negative value']
  }

}));


// var monsterArray = ['godzilla', 'mechagodzilla', 'slattern', 'mutavore', 'otachi', 'leatherback', 'raiju', 'scunner', 'knifehead', 'yamarashi', 'onibaba', 'king-ghidorah', 'zilla', 'mothra', 'shingoji', 'destroyah', 'rodan', 'gigan', 'gamera'];


module.exports = monsterSchema;