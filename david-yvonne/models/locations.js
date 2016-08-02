const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Locations', new Schema( {
  name: {
    type: String,
    required: true
  },
  family: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  }
},{
  timestamps: true
}));
