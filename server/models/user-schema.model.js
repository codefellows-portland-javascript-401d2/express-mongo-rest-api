var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: false,
    default: 'Private'
  },
  dateJoined: {
    type: String,
    required: false,
    default: 'maybe today'
  }
}));

module.exports = userSchema;