const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  citiesRazed: {
    type: Number,
    min: [0, 'citiesRazed cannot be a negative value'],
    default: 0
  }
});

const monsterModel = mongoose.model('Monster', monsterSchema);

module.exports = monsterModel;
