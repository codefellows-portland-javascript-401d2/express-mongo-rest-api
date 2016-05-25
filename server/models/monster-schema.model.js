var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = mongoose.model('Monster', new Schema({
  name: {
    type: String,
    required: true
  }

}));


// var monsterArray = ['godzilla', 'mechagodzilla', 'slattern', 'mutavore', 'otachi', 'leatherback', 'raiju', 'scunner', 'knifehead', 'yamarashi', 'onibaba', 'king-ghidorah', 'zilla', 'mothra', 'shingoji', 'destroyah', 'rodan', 'gigan', 'gamera'];


module.exports = monsterSchema;