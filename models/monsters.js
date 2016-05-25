var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = mongoose.model('Monster', new Schema({
  name: {
    type: String,
    required: true
  }
  // class: {
  //   type: String,
  //   required: false
  // }
}));


var monsterArray = ['godzilla', 'mechagodzilla', 'slattern', 'mutavore', 'otachi', 'leatherback', 'raiju', 'scunner', 'knifehead', 'yamarashi', 'onibaba', 'king-ghidorah', 'zilla', 'mothra', 'shingoji', 'destroyah', 'rodan', 'gigan', 'gamera'];


