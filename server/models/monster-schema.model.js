var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = mongoose.model('Monster', new Schema({
  name: {
    type: String,
    required: true
  },
  citiesRazed: {
    type: Number,
    min: [0, 'citiesRazed cannot be a negative value'],
    default: 0
  }

}));

module.exports = monsterSchema;